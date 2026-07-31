/* global fetch, AbortController */
const { ai: aiConfig } = require("../config/app.config");

/**
 * Generic AI Helper for Soseki App.
 * Handles OpenRouter communication, JSON extraction, validation, and retries.
 */
class AiService {
  /**
   * Calls OpenRouter to generate structured JSON.
   *
   * @param {string} systemPrompt - The system instructions detailing the JSON schema.
   * @param {string} userPrompt - The specific user request.
   * @param {function} validateFn - A callback or Joi schema function that throws if the parsed JSON is invalid.
   * @returns {Promise<Object>} The validated JSON object.
   */
  async generateJson(systemPrompt, userPrompt, validateFn) {
    if (!aiConfig.enableAi) {
      const error = new Error("AI features are currently disabled in configuration.");
      error.status = 503;
      throw error;
    }

    if (!aiConfig.openRouterApiKey || !aiConfig.openRouterModel) {
      const error = new Error("AI is not properly configured. Missing API key or model.");
      error.status = 503;
      throw error;
    }

    const messages = [
      { role: "system", content: systemPrompt },
      { role: "user", content: userPrompt },
    ];

    try {
      return await this._executeWithRetry(messages, validateFn);
    } catch (error) {
      console.error("[AI Service] Final failure:", error.message);
      throw error;
    }
  }

  async _executeWithRetry(messages, validateFn, isRetry = false) {
    const startTime = Date.now();
    let responseText = "";

    try {
      const response = await this._callOpenRouter(messages);
      responseText = response.choices?.[0]?.message?.content || "";
      const usage = response.usage || { prompt_tokens: 0, completion_tokens: 0, total_tokens: 0 };
      const model = response.model || aiConfig.openRouterModel;

      // Strip markdown code blocks like ```json
      const cleanedText = this._extractJson(responseText);

      // Parse JSON
      let parsedJson;
      try {
        parsedJson = JSON.parse(cleanedText);
      } catch (parseError) {
        throw new Error("Failed to parse AI response as valid JSON.");
      }

      if (validateFn) {
        try {
          await validateFn(parsedJson);
        } catch (validationError) {
          throw new Error(`Schema validation failed: ${validationError.message}`);
        }
      }

      const duration = Date.now() - startTime;
      console.log(`[AI Service] Success. Provider: OpenRouter | Model: ${model} | Tokens: ${usage.total_tokens} | Duration: ${duration}ms | Retry: ${isRetry}`);

      return {
        data: parsedJson,
        usage,
        model
      };
    } catch (error) {
      const duration = Date.now() - startTime;
      console.error(`[AI Service] Attempt failed. Provider: OpenRouter | Model: ${aiConfig.openRouterModel} | Duration: ${duration}ms | Retry: ${isRetry} | Error: ${error.message}`);

      if (!isRetry) {
        console.log("[AI Service] Retrying once with stronger instruction...");
        const retryMessages = [
          ...messages,
          { role: "assistant", content: responseText },
          { role: "user", content: "Your previous response was invalid. Please strictly output ONLY valid JSON matching the exact required schema. Do not include markdown formatting or conversational text." }
        ];
        return await this._executeWithRetry(retryMessages, validateFn, true);
      }

      const finalError = new Error(error.message);
      finalError.status = 400; // Client-facing bad request equivalent for AI failing
      throw finalError;
    }
  }

  async _callOpenRouter(messages) {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), aiConfig.aiTimeout);

    try {
      const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${aiConfig.openRouterApiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: aiConfig.openRouterModel,
          messages,
          response_format: { type: "json_object" }, // Enforce JSON if model supports it
        }),
        signal: controller.signal,
      });

      if (!response.ok) {
        const errorText = await response.text();
        const err = new Error(`OpenRouter API error: ${response.status}`);
        err.status = response.status === 401 ? 503 : response.status;
        console.error("[AI Service] API Error:", errorText);
        throw err;
      }

      return await response.json();
    } catch (error) {
      if (error.name === "AbortError") {
        const timeoutError = new Error("AI request timed out.");
        timeoutError.status = 504;
        throw timeoutError;
      }
      throw error;
    } finally {
      clearTimeout(timeoutId);
    }
  }

  _extractJson(text) {
    const jsonBlockRegex = /```(?:json)?\s*([\s\S]*?)\s*```/i;
    const match = text.match(jsonBlockRegex);
    if (match) {
      return match[1].trim();
    }
    // Attempt to extract from first '{' to last '}'
    const startObj = text.indexOf('{');
    const endObj = text.lastIndexOf('}');
    const startArr = text.indexOf('[');
    const endArr = text.lastIndexOf(']');
    
    // Find outermost object or array
    let start = -1;
    let end = -1;
    
    if (startObj !== -1 && endObj !== -1 && (startArr === -1 || startObj < startArr)) {
        start = startObj;
        end = endObj;
    } else if (startArr !== -1 && endArr !== -1) {
        start = startArr;
        end = endArr;
    }

    if (start !== -1 && end !== -1 && end > start) {
        return text.substring(start, end + 1).trim();
    }
    return text.trim();
  }
}

module.exports = new AiService();

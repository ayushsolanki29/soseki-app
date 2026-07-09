const searchService = require("./search.service");
const { searchSchema } = require("./search.validation");

const search = async (req, res) => {
  try {
    // Validate request query
    const { error, value } = searchSchema.query.validate(req.query);
    
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    const { q } = value;
    const organizationId = req.user.organizationId;
    
    const results = await searchService.search(q, organizationId);
    
    res.json({ results });
  } catch (error) {
    console.error("Search Error:", error);
    res.status(500).json({ error: "Search failed" });
  }
};

module.exports = {
  search
};

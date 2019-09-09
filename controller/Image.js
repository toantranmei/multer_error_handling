module.exports = {
  save: async (req, res) => {
    res.status(200).json({ status: "success", data: req.files });
  }
};

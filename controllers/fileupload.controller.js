exports.fileUpload = async (req, res) => {
  try {
    res.status(200).json(req.files);
  } catch (error) {}
};

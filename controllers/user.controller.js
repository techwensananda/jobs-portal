const { signupService, logiService } = require("../services/user.service");

exports.createUser = async (req, res, next) => {
  console.log("first");
  try {
    const result = await signupService(req.body);
    console.log(result, "result");
    res.status(200).json({
      status: "success",
      message: "Successfully created the user",
    });
  } catch (error) {
    res.status(500).json({
      status: "fail",
      error: "couldn't create the user",
      message: error.message,
    });
  }
};
exports.loginUser = async (req, res, next) => {
  try {
    const result = await logiService(req.body);
    // console.log(result, "result");
    res.status(200).json({
      status: "success",
      data: result,
      message: "Successfully login the user",
    });
  } catch (error) {
    res.status(500).json({
      status: "fail",
      error: "couldn't login the user",
      message: error?.message,
    });
  }
};
exports.getme = async (req, res, next) => {
  try {
    console.log(req.user);
    // const result = await logiService(req.body);
    // console.log(result, "result");
    res.status(200).json({
      status: "success",
      data: req.user,
      message: "Successfully login the user",
    });
  } catch (error) {
    res.status(500).json({
      status: "fail",
      error: "couldn't login the user",
      message: error?.message,
    });
  }
};
exports.admin = async (req, res, next) => {
  try {
    console.log(req.user);
    // const result = await logiService(req.body);
    // console.log(result, "result");
    res.status(200).json({
      status: "success",
      data: req.user,
      message: "Successfully login the user",
    });
  } catch (error) {
    res.status(500).json({
      status: "fail",
      error: "couldn't login the user",
      message: error?.message,
    });
  }
};

//   exports.getAllBrands = async (req, res, next) => {
//     try {
//       const brands = await getAllBrandsService();
//       res.status(200).json({
//         status: "success",
//         data: brands,
//         message: "Successfully created the brand",
//       });
//     } catch (error) {
//       res.status(400).json({
//         status: "fail",
//         error: "couldn't get the brands",
//       });
//     }
//   };

//   exports.getBrandById = async (req, res, next) => {
//     try {
//       const brand = await getBrandService(req.params.id);
//       if (!brand) {
//         return res.status(400).json({
//           status: "fail",
//           message: "couldn't find brand with this id",
//         });
//       }
//       res.status(200).json({
//         status: "success",
//         data: brand,
//         message: "Successfully created the brand",
//       });
//     } catch (error) {
//       res.status(400).json({
//         status: "fail",
//         error: "couldn't get the brand",
//       });
//     }
//   };

//   exports.updateBrandById = async (req, res, next) => {
//     const { id } = req.params;
//     console.log(id);
//     try {
//       const result = await updateBrandService(id, req.body);
//       console.log(result);
//       if (!result.modifiedCount) {
//         return res.status(400).json({
//           status: "fail",
//           error: "couldn't find brand with this id",
//           message: error.message,
//         });
//       }
//       res.status(200).json({
//         status: "success",

//         message: "Successfully updated the brand",
//       });
//     } catch (error) {
//       res.status(400).json({
//         status: "fail",
//         error: "couldn't updxate the brand with this id",
//       });
//     }
//   };

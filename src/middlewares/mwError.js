//src/middlewares/mwError.js

const error = {
  e400: (err, req, res) => {
    let ErrorMessage =
      "The request could not be understood or was missing required parameters.";
    if (err && err.message) {
      ErrorMessage = err.message;
    }
    res.status(400).json({
      title: "Error 400 Bad Request",
      message: ErrorMessage,
    });
  },
  e401: (err, req, res) => {
    let ErrorMessage = "Authorization is required for this resource.";
    if (err && err.message) {
      ErrorMessage = err.message;
    }
    res.status(401).json({
      title: "Error 401 Authorization Required",
      message: ErrorMessage,
    });
  },
  e403: (err, req, res) => {
    let ErrorMessage = "You do not have permission to access this resource.";
    if (err && err.message) {
      ErrorMessage = err.message;
    }
    res.status(403).json({
      title: "Error 403 Forbidden",
      message: ErrorMessage,
    });
  },
  e404: (req, res, next) => {
    res.status(404).json({
      title: "Error 404 Not Found",
      message: "The resource you are looking for does not exist.",
      timestamp: new Date().toUTCString(),
    });
  },
  e405: (err, req, res) => {
    let ErrorMessage =
      "The method used in the request is not allowed for the resource.";
    if (err && err.message) {
      ErrorMessage = err.message;
    }
    res.status(405).json({
      title: "Error 405 Method Not Allowed",
      message: ErrorMessage,
    });
  },
  e409: (err, req, res) => {
    let ErrorMessage =
      "The request could not be completed due to a conflict with the current state of the resource.";
    if (err && err.message) {
      ErrorMessage = err.message;
    }
    res.status(409).json({
      title: "Error 409 Conflict",
      message: ErrorMessage,
    });
  },
  e422: (err, req, res) => {
    let ErrorMessage =
      "The request was well-formed, but there were validation errors.";
    if (err && err.message) {
      ErrorMessage = err.message;
    }
    res.status(422).json({
      title: "Error 422 Unprocessable Entity",
      message: ErrorMessage,
    });
  },
  e500: (err, req, res) => {
    let ErrorMessage = "An internal server error occurred.";
    if (err && err.message) {
      ErrorMessage = err.message;
    }
    res.status(500).json({
      title: "Error 500 Internal Server Error",
      message: ErrorMessage,
    });
  },
  e502: (err, req, res) => {
    let ErrorMessage =
      "The server received an invalid response from the upstream server.";
    if (err && err.message) {
      ErrorMessage = err.message;
    }
    res.status(502).json({
      title: "Error 502 Bad Gateway",
      message: ErrorMessage,
    });
  },
  e503: (err, req, res) => {
    let ErrorMessage =
      "The server is currently unavailable. Please try again later.";
    if (err && err.message) {
      ErrorMessage = err.message;
    }
    res.status(503).json({
      title: "Error 503 Service Unavailable",
      message: ErrorMessage,
    });
  },
  e504: (err, req, res) => {
    let ErrorMessage =
      "The server, acting as a gateway, did not receive a response in time.";
    if (err && err.message) {
      ErrorMessage = err.message;
    }
    res.status(504).json({
      title: "Error 504 Gateway Timeout",
      message: ErrorMessage,
    });
  },
  eDefault: (err, req, res, next) => {
    let ErrorMessage = "An unexpected error occurred";
    if (err && err.message) {
      ErrorMessage = err.message;
    }
    res.status(err?.status || 500).json({
      title: `Error ${err?.status || 500}`,
      message: ErrorMessage,
    });
  },
};

export default error;

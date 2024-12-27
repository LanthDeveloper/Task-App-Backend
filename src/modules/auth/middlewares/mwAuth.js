//src/modules/auth/middlewares/mwAuth.js

import {
  SUPABASE_ANON_KEY,
  SUPABASE_URL,
} from "../../../config/vars/supabase.js";
import { createClient } from "@supabase/supabase-js";
import jwt from "jsonwebtoken";
import error from "./mwError.js";

const isAuthenticated = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res.status(401).json({ error: "No authorization header" });
    }

    // Verificar que el token sea del tipo correcto
    const [bearer, token] = authHeader.split(" ");
    if (bearer !== "Bearer" || !token) {
      return res.status(401).json({ error: "Invalid token format" });
    }

    // Decodificar el JWT
    const decoded = jwt.decode(token);
    if (!decoded) {
      return res.status(401).json({ error: "Invalid token" });
    }

    const currentTimestamp = Math.floor(Date.now() / 1000);
    if (decoded.exp < currentTimestamp) {
      return res.status(401).json({ error: "Token has expired" });
    }

    // Crear un cliente de Supabase con el token del usuario
    const userSupabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
      global: {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    });

    // Guardar el cliente de Supabase en la request para usarlo en las rutas
    req.userSupabase = userSupabase;
    req.userDataSupabase = {
      id: decoded.sub,
      email: decoded.email,
      role: decoded.role,
      app_metadata: decoded.app_metadata,
      user_metadata: decoded.user_metadata,
    };

    next();
  } catch (err) {
    const status = err.status || 403;
    return error[`e${status}`](err, req, res);
  }
};

export default isAuthenticated;

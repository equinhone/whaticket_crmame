import { Request, Response } from "express";
import AppError from "../errors/AppError";
import { getIO } from "../libs/socket";

import AuthUserService from "../services/UserServices/AuthUserService";
import { SendRefreshToken } from "../helpers/SendRefreshToken";
import { RefreshTokenService } from "../services/AuthServices/RefreshTokenService";
import FindUserFromToken from "../services/AuthServices/FindUserFromToken";
import User from "../models/User";

export const getToken = async (req: Request, res: Response): Promise<Response> => {
  const { email, password } = req.body;  
  
  const { token, serializedUser, refreshToken } = await AuthUserService({
    email,
    password
  });

  //SendRefreshToken(res, refreshToken);

  const io = getIO();
  io.emit(`company-${serializedUser.companyId}-auth`, {
    action: "update",
    user: {
      id: serializedUser.id,
      email: serializedUser.email,
      companyId: serializedUser.companyId
    }
  });

  //console.log(token)
  //console.log(serializedUser)
  //console.log(refreshToken)

  return res.status(200).json({
    token,
    user: serializedUser
  });
};


export const store = async (req: Request, res: Response): Promise<Response> => {
  const { email, password } = req.body;
  //email = 'admin@admin.com'
  //password = '123456'
  //console.log('recebendo login');
  //console.log(req.body)
  //console.log(email) s  
  
  const { token, serializedUser, refreshToken } = await AuthUserService({
    email,
    password
  });

  SendRefreshToken(res, refreshToken);

  const io = getIO();
  io.emit(`company-${serializedUser.companyId}-auth`, {
    action: "update",
    user: {
      id: serializedUser.id,
      email: serializedUser.email,
      companyId: serializedUser.companyId
    }
  });

  //console.log(token)
  //console.log(serializedUser)
  //console.log(refreshToken)

  return res.status(200).json({
    token,
    user: serializedUser
  });
};

export const update = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const token: string = req.cookies.jrt;

  console.log('iniciando autenticacao')
  console.log(token)

  if (!token) {
    throw new AppError("ERR_SESSION_EXPIRED", 401);
  }

  const { user, newToken, refreshToken } = await RefreshTokenService(
    res,
    token
  );

  SendRefreshToken(res, refreshToken);

  return res.json({ token: newToken, user });
};

export const me = async (req: Request, res: Response): Promise<Response> => {
  const token: string = req.cookies.jrt;
  const user = await FindUserFromToken(token);
  const { id, profile, super: superAdmin } = user;
  
  console.log(token)

  if (!token) {
    throw new AppError("ERR_SESSION_EXPIRED", 401);
  }

  return res.json({ id, profile, super: superAdmin });
};

export const remove = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { id } = req.user;
  const user = await User.findByPk(id);
  await user.update({ online: false });

  res.clearCookie("jrt");

  return res.send();
};

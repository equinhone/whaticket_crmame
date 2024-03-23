import { Response } from "express";

export const SendRefreshToken = (res: Response, token: string): void => {
  //res.cookie("jrt", token, { httpOnly: true });
  let DataToken = new Date(Date.now())
  //console.log(DataToken)
  DataToken.setDate(DataToken.getDate() + 3)
  //console.log(DataToken)  
  res.cookie('jrt', token, { expires: new Date(DataToken), httpOnly: true });
  
};

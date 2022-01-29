import axios from 'axios';
import express from 'express';
import {Scan} from '../entity/Scan';
import {User} from '../entity/User';

const routes = express.Router();

type ScanQRRequestType = {
  name: string;
  code: number;
};

type ScanQRRequestResponseType = {
  message: string;
  dish: string;
  phoneNumber: string;
};

type ApiResponseType = ScanQRRequestResponseType & {
  time: string;
};

const generateErrorResponse = (e: Error, res: any) =>
  res
    .status(400)
    .json({
      error: e,
    })
    .end();

routes.post<
  {},
  {
    data: ScanQRRequestResponseType;
  },
  ScanQRRequestType
>('/scan-qr', async (req, res) => {
  const name = req.body.name;
  const code = req.body.code;
  if (!!!code || !!!name) {
    return generateErrorResponse(
      new Error('Name & Scanned QR code is required.'),
      res,
    );
  }
  try {
    const response = await axios.get<ApiResponseType>(
      `https://docs.bcomo.com/qrcode/${code}`,
      {
        headers: {
          'x-api-key': 'OsamaAhmed',
        },
      },
    );
    const data = response.data;
    if (!!!data) {
      return generateErrorResponse(
        new Error('Something went wrong, Please Scan QR code again.'),
        res,
      );
    }
    // find or create user by user name
    let user = await User.createQueryBuilder('u')
      .where('LOWER(u.name) = LOWER(:name)', {name})
      .getOne();
    if (!!!user) {
      user = await User.create({
        name,
      }).save();
    }
    // add data from api in Scan entity
    const scanInstance = new Scan();
    scanInstance.code = code;
    scanInstance.message = data.message;
    scanInstance.time = data.time;
    scanInstance.dish = data.dish;
    scanInstance.phoneNumber = data.phoneNumber;
    scanInstance.user = user;
    await scanInstance.save();
    return res
      .status(200)
      .json({
        data: {
          message: data.message,
          dish: data.dish,
          phoneNumber: data.phoneNumber,
        },
      })
      .end();
  } catch (e) {
    return generateErrorResponse(new Error(e.message), res);
  }
});

routes.get<{userName: string}, {data: Scan[]}>(
  '/scans/:userName',
  async (req, res) => {
    const userName = req.params.userName;
    if (!!!userName) {
      return generateErrorResponse(new Error('Full Name is required.'), res);
    }
    // get all scans from this user
    let qb = User.createQueryBuilder('user');
    qb.leftJoinAndSelect('user.scans', 'scans');
    qb.where('LOWER(user.name) = LOWER(:userName)', {userName});
    const user = await qb.getOne();
    const scans = user?.scans || [];
    return res
      .status(200)
      .json({
        data: scans,
      })
      .end();
  },
);

export default routes;

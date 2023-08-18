import { Request, Response } from 'express'
import { hash, compare } from 'bcryptjs'
import { sign } from 'jsonwebtoken'

import User from '../models/User'
import appConfig from '../config'

export const signup = async (req: Request, res: Response) => {
	try {
		const { name, nickName, email, password, phone, image, bio, address } = req.body

		const isNameExist = await User.findOne({ where: { name: name } });
		if (isNameExist) {
			return res.status(409).json({ message: `The name ${name} already exists.` });
		}
		const isEmailExist = await User.findOne({ where: { email: email } });
		if (isEmailExist) {
			return res.status(409).json({ message: `The email ${email} already exists.` });
		}
		const isPhoneExist = await User.findOne({ where: { phone: phone } });
		if (isPhoneExist) {
			return res.status(409).json({ message: `The phone ${phone} already exists.` });
		}

		const hashedPassword = await hash(password, 10);

		const newUser: any = await User.create({
			name,
			nickName,
			email,
			phone,
			image,
			bio,
			address,
			password: hashedPassword,
		});

		const token = sign(
			{
				id: newUser.id,
				name: newUser.name,
				email: newUser.email,
				image: newUser.image
			},
			appConfig.secretSignJwt,
			{
				expiresIn: 86400,
			}
		);

		return res.json({ accessToken: token });

	} catch (error) {
		return
	}
}

export const login = async (req: Request, res: Response) => {
	try {
		const { email, phone, password } = req.body

		let user: any

		if (email) {
			user = await User.findOne({
				where: { email }
			});
		} else if (phone) {
			user = await User.findOne({
				where: { phone }
			});
		} else {
			return res.status(400).json({ error: "Please provide either email or phone" });
		}

		if (!user) {
			return res.status(401).json({ error: "User not found" });
		}

		const storedHashedPassword = user.password;

		const isPasswordMatch = await compare(password, storedHashedPassword);

		if (!isPasswordMatch) {
			return res.status(401).json({ error: "Invalid credentials" });
		}

		const token = sign(
			{
				id: user.id,
				name: user.name,
				email: user.email,
				image: user.image
			},
			appConfig.secretSignJwt,
			{
				expiresIn: 86400,
			}
		);

		return res.json({ accessToken: token });
	} catch (error) {
		return res.status(500).json({ error: "Internal server error" })
	}

}
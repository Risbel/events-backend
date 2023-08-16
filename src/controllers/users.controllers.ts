import { Request, Response } from 'express'
import bcrypt from 'bcryptjs'
import User from '../models/User'
import { UserEntries } from '../types.t';


export const getUsers = async (_req: Request, res: Response): Promise<Response> => {
	try {
		const users = await User.findAll();
		return res.json(users);
	} catch (error: any) {
		return res.status(500).json({ message: error.message });
	}
}

export const getUser = async (req: Request, res: Response): Promise<Response> => {
	try {
		const { id } = req.params;

		const user = await User.findOne({
			where: {
				id,
			},
		});

		if (!user) {
			res.status(404).json({ message: "User does not exist" });
		}

		return res.status(200).json(user);
	} catch (error) {
		return res.status(500).json({ error: "Internal server error" })
	}
}

export const createUser = async (req: Request, res: Response): Promise<Response> => {
	try {
		const { name, lastName, email, phone, password, imageUrl }: UserEntries = req.body;

		const hashedPassword = await bcrypt.hash(password, 10);

		const newUser = await User.create({
			name,
			lastName,
			email,
			phone,
			imageUrl,
			password: hashedPassword,
		});
		return res.status(200).json(newUser);
	} catch (error: any) {
		return res.status(500).json({ message: error.message });
	}
}


export const updateUser = async (req: Request, res: Response): Promise<Response> => {
	try {
		const { id } = req.params;
		const { name, lastName, email, phone, imageUrl } = req.body;

		const user: UserEntries | any = await User.findByPk(id);
		if (!user) {
			return res.status(404).json({ message: 'User not found' });
		}
		user.name = name;
		user.lastName = lastName;
		user.email = email;
		user.phone = phone;
		user.imageUrl = imageUrl;

		const updatedUser = user

		const newUser = await updatedUser.save();

		return res.status(200).json(newUser)
	} catch (error: any) {
		return res.status(500).json({ message: error.message });
	}
}


export const deleteUser = async (req: Request, res: Response): Promise<Response> => {
	try {
		const { id } = req.params;

		await User.destroy({
			where: {
				id,
			},
		});

		return res.sendStatus(200).json({ message: "User deleted successfuly" });

	} catch (error: any) {
		return res.status(500).json({ message: error.message });
	}
}
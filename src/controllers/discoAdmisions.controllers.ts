import { Request, Response } from 'express'
import DiscoAdmission from '../models/DiscoAdmission'
import Disco from '../models/Disco'

export const getAdmisions = async (_req: Request, res: Response) => {
	try {
		const discoAdmisions = await DiscoAdmission.findAll({ include: Disco })

		return res.status(200).json(discoAdmisions)
	} catch (error: any) {
		return res.status(500).json({ error: error.message })
	}
}

export const getAdmisionsByIdDisco = async (req: Request, res: Response) => {
	try {
		const { id } = req.params

		const admisionsByDisco = await DiscoAdmission.findAll({ where: { discoId: id } })
		return res.status(200).json(admisionsByDisco)
	} catch (error: any) {
		return res.status(500).json({ error: error.message })
	}
}

export const createDiscoAdmision = async (req: Request, res: Response) => {
	try {
		const { id } = req.params
		const { price, description, category, quantity } = req.body

		const newDiscoAdmision = await DiscoAdmission.create({
			discoId: id,
			price,
			description,
			category,
			quantity
		})

		return res.status(200).json(newDiscoAdmision)

	} catch (error: any) {
		return res.status(500).json({ error: error.message })
	}
}

export const updateDiscoAdmision = async (req: Request, res: Response) => {
	try {
		const { id } = req.params
		const { price, description, category, quantity } = req.body

		const discoAdmision: any = await DiscoAdmission.findOne({
			where: { discoId: id }
		})
		discoAdmision.price = price,
			discoAdmision.description = description,
			discoAdmision.category = category,
			discoAdmision.quantity = quantity

		const newDiscoAdmision = await discoAdmision.save()

		return res.status(200).json(newDiscoAdmision)
	} catch (error: any) {
		return res.status(500).json({ error: error.message })
	}
}

export const deleteDiscoAdmision = async (req: Request, res: Response) => {
	try {
		const { id } = req.params

		await DiscoAdmission.destroy(
			{
				where: { discoId: id }
			}
		)

		res.status(200).json({ message: "DiscoAdmission deleted successfuly" })
	} catch (error: any) {
		return res.status(500).json({ error: error.message })
	}
}

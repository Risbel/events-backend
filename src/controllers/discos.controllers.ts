import { Request, Response } from 'express'
import Disco from '../models/Disco'
import DiscoDetail from '../models/DiscoDetail'

export const getDiscos = async (_req: Request, res: Response): Promise<Response> => {
	try {
		const discos = await Disco.findAll({ include: DiscoDetail })
		return res.json(discos)
	} catch (error: any) {
		return res.status(500).json({ message: error.message });
	}
}

export const getDisco = async (req: Request, res: Response): Promise<Response> => {
	try {
		const { id } = req.params;

		const disco = await Disco.findOne({
			where: {
				id: id
			},
			include: DiscoDetail
		})

		if (!disco) {
			res.status(404).json({ message: "Disco does not exist" });
		}

		return res.status(200).json(disco)
	} catch (error: any) {
		return res.status(500).json({ message: error.message });
	}
}

export const createDisco = async (req: Request, res: Response): Promise<Response> => {
	try {
		const { name, logo, slug, administrator, description, image, address } = req.body

		const newDisco: any = await Disco.create(
			{
				name,
				logo,
			}
		)
		const discoId = newDisco.id
		const detailsDisco = await DiscoDetail.create(
			{
				discoId,
				administrator,
				description,
				image,
				address,
				slug
			}
		)
		return res.status(200).json({ disco: newDisco, details: detailsDisco })
	} catch (error: any) {
		return res.status(500).json({ message: error.message });
	}
}

export const updateDisco = async (req: Request, res: Response): Promise<Response> => {
	try {

		const { id } = req.params
		const { name, logo, slug, administrator, description, image, address } = req.body

		const disco: any = await Disco.findByPk(id)
		const discoDetails: any = await DiscoDetail.findOne({
			where: { discoId: id }
		})
		disco.name = name
		disco.logo = logo
		discoDetails.slug = slug
		discoDetails.administrator = administrator
		discoDetails.description = description
		discoDetails.image = image
		discoDetails.address = address

		const newDisco = await disco.save()
		const details = await discoDetails.save()

		return res.status(200).json({ disco: newDisco, details: details })
	} catch (error: any) {
		return res.status(500).json({ message: error.message });
	}
}

export const deleteDisco = async (req: Request, res: Response): Promise<Response> => {
	try {

		const { id } = req.params

		await DiscoDetail.destroy({
			where: {
				discoId: id
			}
		})
		await Disco.destroy({
			where: {
				id: id
			}
		})

		return res.status(200).json({ message: "Disco deleted successfuly" });
	} catch (error: any) {
		return res.status(500).json({ message: error.message });
	}
}

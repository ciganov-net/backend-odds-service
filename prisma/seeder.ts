import { PrismaPg } from '@prisma/adapter-pg'
import { Decimal } from '@prisma/client/runtime/client'
import * as dotenv from 'dotenv'

import { Category, Event, Outcome, PrismaClient } from './generated/client'

dotenv.config({
	path: '.env.production.local'
})

const adapter = new PrismaPg({
	user: process.env.DATABASE_USER!,
	password: process.env.DATABASE_PASSWORD!,
	host: process.env.DATABASE_HOST!,
	port: Number(process.env.DATABASE_PORT!),
	database: process.env.DATABASE_NAME!
})

const prisma = new PrismaClient({ adapter })

const CATEGORIES: Category[] = [
	{
		id: 'yNc_sSG7aWmqD64TlygGD',
		badgeColor: 'red',
		name: 'Персонажи',
		image: '',
		slug: 'person',
		isActive: true,
		description: 'Оры, споры, матюки',
		updatedAt: new Date(),
		createdAt: new Date()
	},
	{
		id: 'gliotCYDbHEPXqL_A59iZ',
		badgeColor: 'lime',
		name: 'Медиа',
		image: '',
		slug: 'media',
		isActive: true,
		description: 'Контора солнышек',
		updatedAt: new Date(),
		createdAt: new Date()
	},
	{
		id: 'Omdm-n_KHEnWkMcZFFdbi',
		badgeColor: 'cyan',
		name: 'Мистика',
		image: '',
		slug: 'mystic',
		isActive: true,
		description: 'Невозможное возможно',
		updatedAt: new Date(),
		createdAt: new Date()
	},
	{
		id: 'eLDoOPKG2OBeiB_5G7H6r',
		badgeColor: 'blue',
		name: 'Лайфстайл',
		image: '',
		slug: 'lifestyle',
		isActive: true,
		description: 'Пу-пу-пу',
		updatedAt: new Date(),
		createdAt: new Date()
	}
]

const EVENTS: Event[] = [
	{
		id: 'hRpfGoZ7aLTEFYSVh1idj',
		categoryId: 'eLDoOPKG2OBeiB_5G7H6r',
		name: 'Сколько человек придёт на пару Мутовина?',
		start: new Date('2026-06-20T05:00:00'),
		end: new Date('2026-06-20T10:00:00'),
		isLive: false,
		status: 'UPCOMING',
		createdAt: new Date(),
		updatedAt: new Date()
	},
	{
		id: 'WgE8Erz5VagI5ECOau978',
		categoryId: 'eLDoOPKG2OBeiB_5G7H6r',
		name: 'Заведется ли у Кирика матиз?',
		start: new Date('2026-06-19T22:00:00'),
		end: new Date('2026-06-20T00:00:00'),
		isLive: false,
		status: 'UPCOMING',
		createdAt: new Date(),
		updatedAt: new Date()
	},
	{
		id: 'yvV30zqwb41qLeimINfhC',
		categoryId: 'eLDoOPKG2OBeiB_5G7H6r',
		name: 'Отправит ли Гаврилин ⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️',
		start: new Date('2026-06-19T21:00:00'),
		end: new Date('2026-06-19T23:00:00'),
		isLive: false,
		status: 'UPCOMING',
		createdAt: new Date(),
		updatedAt: new Date()
	},
	{
		id: '9A9YknGmTp2FjHNhInDDX',
		categoryId: 'eLDoOPKG2OBeiB_5G7H6r',
		name: 'Проведёт ли Сидоров зачёт?',
		start: new Date('2026-06-23T15:00:00'),
		end: new Date('2026-06-23T17:00:00'),
		isLive: false,
		status: 'UPCOMING',
		createdAt: new Date(),
		updatedAt: new Date()
	},
	{
		id: 'dsamkyXA_khWr3RgmqTZE',
		categoryId: 'eLDoOPKG2OBeiB_5G7H6r',
		name: 'Заблокируют ли интернет сегодня?',
		start: new Date('2026-06-19T23:00:00'),
		end: new Date('2026-06-20T01:00:00'),
		isLive: false,
		status: 'UPCOMING',
		createdAt: new Date(),
		updatedAt: new Date()
	},
	{
		id: 'deb0Lqv1jZyg6m-ZfWiPy',
		categoryId: 'eLDoOPKG2OBeiB_5G7H6r',
		name: 'Будет ли Гинесс по скидке?',
		start: new Date('2026-06-25T10:00:00'),
		end: new Date('2026-06-26T00:00:00'),
		isLive: false,
		status: 'UPCOMING',
		createdAt: new Date(),
		updatedAt: new Date()
	},

	{
		id: 'C9DUrC-1LnTUjpNAnPruT',
		categoryId: 'Omdm-n_KHEnWkMcZFFdbi',
		name: 'Бросит ли Вадим пить?',
		start: new Date('2026-06-19T00:00:00'),
		end: new Date('2026-06-21T00:00:00'),
		isLive: false,
		status: 'UPCOMING',
		createdAt: new Date(),
		updatedAt: new Date()
	},
	{
		id: 'aJTpRPqET_e4swmbYPseq',
		categoryId: 'Omdm-n_KHEnWkMcZFFdbi',
		name: 'Воскреснет ли Паша Техник?',
		start: new Date('2026-06-18T00:00:00'),
		end: new Date('2026-07-21T00:00:00'),
		isLive: false,
		status: 'UPCOMING',
		createdAt: new Date(),
		updatedAt: new Date()
	},
	{
		id: 'hXOMXCXuCa9tWBN6BRiyJ',
		categoryId: 'Omdm-n_KHEnWkMcZFFdbi',
		name: 'Сделает ли кизару фит с фараоном?',
		start: new Date('2026-06-19T20:00:00'),
		end: new Date('2026-06-22T00:00:00'),
		isLive: false,
		status: 'UPCOMING',
		createdAt: new Date(),
		updatedAt: new Date()
	},
	{
		id: '6BMZx_P_gJ_Ry8QkclVlm',
		categoryId: 'Omdm-n_KHEnWkMcZFFdbi',
		name: 'Бросит ли Ярик 1С?',
		start: new Date('2026-06-25T00:00:00'),
		end: new Date('2026-07-25T00:00:00'),
		isLive: false,
		status: 'UPCOMING',
		createdAt: new Date(),
		updatedAt: new Date()
	},
	{
		id: 'VERT-WFz2dXsVYBt4qqaI',
		categoryId: 'Omdm-n_KHEnWkMcZFFdbi',
		name: 'Купит ли Федя айфон?',
		start: new Date('2026-06-18T00:00:00'),
		end: new Date('2026-06-20T00:00:00'),
		isLive: false,
		status: 'FINISHED',
		createdAt: new Date(),
		updatedAt: new Date()
	},
	{
		id: '8bpOJgG5vfq_KR5mKYUqC',
		categoryId: 'Omdm-n_KHEnWkMcZFFdbi',
		name: 'Упадёт ли метеорит?',
		start: new Date('2026-06-20T00:00:00'),
		end: new Date('2026-10-20T00:00:00'),
		isLive: false,
		status: 'UPCOMING',
		createdAt: new Date(),
		updatedAt: new Date()
	},

	{
		id: '3EJjd9RaN3Hi7c5NnCRCn',
		categoryId: 'gliotCYDbHEPXqL_A59iZ',
		name: 'Появится ли новый мем?',
		start: new Date('2026-06-19T15:00:00'),
		end: new Date('2026-06-20T00:00:00'),
		isLive: false,
		status: 'UPCOMING',
		createdAt: new Date(),
		updatedAt: new Date()
	},
	{
		id: 'mabB9TFxLmZ5CXgyzZ5kt',
		categoryId: 'gliotCYDbHEPXqL_A59iZ',
		name: 'Выложит ли Сидни Суини новые фотки?',
		start: new Date('2026-06-20T00:00:00'),
		end: new Date('2026-06-20T05:00:00'),
		isLive: false,
		status: 'UPCOMING',
		createdAt: new Date(),
		updatedAt: new Date()
	},
	{
		id: 'PzAKx8tiofVbIRDVvDgIb',
		categoryId: 'gliotCYDbHEPXqL_A59iZ',
		name: 'Выйдет ли Универ 20 лет спустя?',
		start: new Date('2027-02-20T00:00:00'),
		end: new Date('2027-05-20T05:00:00'),
		isLive: false,
		status: 'UPCOMING',
		createdAt: new Date(),
		updatedAt: new Date()
	},
	{
		id: 'oXmvXC8qnfqVw8idNfGFs',
		categoryId: 'gliotCYDbHEPXqL_A59iZ',
		name: 'Вернется ли Антоха Dyrachyo на про сцену?',
		start: new Date('2026-06-24T00:00:00'),
		end: new Date('2026-06-25T12:00:00'),
		isLive: false,
		status: 'UPCOMING',
		createdAt: new Date(),
		updatedAt: new Date()
	},
	{
		id: '9TmQLlIuEP8ORNxjpRi3g',
		categoryId: 'gliotCYDbHEPXqL_A59iZ',
		name: 'Заблокируют ли VLESS?',
		start: new Date('2026-06-22T00:00:00'),
		end: new Date('2026-06-23T12:00:00'),
		isLive: false,
		status: 'UPCOMING',
		createdAt: new Date(),
		updatedAt: new Date()
	},
	{
		id: '5GuPTMXxe7NLdkSjgRVaJ',
		categoryId: 'gliotCYDbHEPXqL_A59iZ',
		name: 'Навайбкодят ли доту 3?',
		start: new Date('2027-01-01T00:00:00'),
		end: new Date('2027-06-01T00:00:00'),
		isLive: false,
		status: 'UPCOMING',
		createdAt: new Date(),
		updatedAt: new Date()
	},

	{
		id: '6SxmrEyeG6lDAnO0mGvc5',
		categoryId: 'yNc_sSG7aWmqD64TlygGD',
		name: 'Пошлет ли кого-то Диман сегодня?',
		start: new Date('2026-06-19T00:00:00'),
		end: new Date('2026-06-20T00:00:00'),
		isLive: false,
		status: 'UPCOMING',
		createdAt: new Date(),
		updatedAt: new Date()
	},
	{
		id: 'pYsvFAnbcpSyRjvNxwh1e',
		categoryId: 'yNc_sSG7aWmqD64TlygGD',
		name: 'Вернет ли Аркаша 500 руб?',
		start: new Date('2026-01-19T00:00:00'),
		end: new Date('2026-08-20T00:00:00'),
		isLive: false,
		status: 'UPCOMING',
		createdAt: new Date(),
		updatedAt: new Date()
	},
	{
		id: 'gG7K3WJsVBGWW60B0DLi1',
		categoryId: 'yNc_sSG7aWmqD64TlygGD',
		name: 'Заберут ли Вадима в дурку?',
		start: new Date('2026-06-25T00:00:00'),
		end: new Date('2026-08-25T00:00:00'),
		isLive: false,
		status: 'UPCOMING',
		createdAt: new Date(),
		updatedAt: new Date()
	},
	{
		id: 'q9Q1Dnq_7iys-0EeFsJy1',
		categoryId: 'yNc_sSG7aWmqD64TlygGD',
		name: 'Заманит ли Петрушин кого-то в лагерь?',
		start: new Date('2026-06-15T00:00:00'),
		end: new Date('2026-06-30T00:00:00'),
		isLive: false,
		status: 'UPCOMING',
		createdAt: new Date(),
		updatedAt: new Date()
	},
	{
		id: 'l9ZK2UNO709HOdpVVrqWS',
		categoryId: 'yNc_sSG7aWmqD64TlygGD',
		name: 'Сдаст ли Белялов Артур экзамен Гаврилину?',
		start: new Date('2026-06-19T00:00:00'),
		end: new Date('2026-07-20T00:00:00'),
		isLive: false,
		status: 'UPCOMING',
		createdAt: new Date(),
		updatedAt: new Date()
	},
	{
		id: '6a9DKfnQgf4r9h7Q7CsKt',
		categoryId: 'yNc_sSG7aWmqD64TlygGD',
		name: 'Проведет ли Казимиров хоть одну пару за год?',
		start: new Date('2026-01-01T00:00:00'),
		end: new Date('2026-12-30T00:00:00'),
		isLive: false,
		status: 'UPCOMING',
		createdAt: new Date(),
		updatedAt: new Date()
	}
]

const OUTCOMES: Outcome[] = [
	// hRpfGoZ7aLTEFYSVh1idj
	{
		id: '17z3_C7Amka1FC6W1CXo9',
		coefficient: new Decimal(1.6),
		name: 'Да',
		eventId: 'hRpfGoZ7aLTEFYSVh1idj',
		isActive: true,
		createdAt: new Date(),
		updatedAt: new Date()
	},
	{
		id: '-KHiFD7CJSRSiiaf6OP49',
		coefficient: new Decimal(1.6),
		name: 'Нет',
		eventId: 'hRpfGoZ7aLTEFYSVh1idj',
		isActive: true,
		createdAt: new Date(),
		updatedAt: new Date()
	},

	// WgE8Erz5VagI5ECOau978
	{
		id: 'out001_yes',
		coefficient: new Decimal(1.6),
		name: 'Да',
		eventId: 'WgE8Erz5VagI5ECOau978',
		isActive: true,
		createdAt: new Date(),
		updatedAt: new Date()
	},
	{
		id: 'out001_no',
		coefficient: new Decimal(1.6),
		name: 'Нет',
		eventId: 'WgE8Erz5VagI5ECOau978',
		isActive: true,
		createdAt: new Date(),
		updatedAt: new Date()
	},

	// yvV30zqwb41qLeimINfhC
	{
		id: 'out002_yes',
		coefficient: new Decimal(1.6),
		name: 'Да',
		eventId: 'yvV30zqwb41qLeimINfhC',
		isActive: true,
		createdAt: new Date(),
		updatedAt: new Date()
	},
	{
		id: 'out002_no',
		coefficient: new Decimal(1.6),
		name: 'Нет',
		eventId: 'yvV30zqwb41qLeimINfhC',
		isActive: true,
		createdAt: new Date(),
		updatedAt: new Date()
	},

	// 9A9YknGmTp2FjHNhInDDX
	{
		id: 'out003_yes',
		coefficient: new Decimal(1.6),
		name: 'Да',
		eventId: '9A9YknGmTp2FjHNhInDDX',
		isActive: true,
		createdAt: new Date(),
		updatedAt: new Date()
	},
	{
		id: 'out003_no',
		coefficient: new Decimal(1.6),
		name: 'Нет',
		eventId: '9A9YknGmTp2FjHNhInDDX',
		isActive: true,
		createdAt: new Date(),
		updatedAt: new Date()
	},

	// dsamkyXA_khWr3RgmqTZE
	{
		id: 'out004_yes',
		coefficient: new Decimal(1.6),
		name: 'Да',
		eventId: 'dsamkyXA_khWr3RgmqTZE',
		isActive: true,
		createdAt: new Date(),
		updatedAt: new Date()
	},
	{
		id: 'out004_no',
		coefficient: new Decimal(1.6),
		name: 'Нет',
		eventId: 'dsamkyXA_khWr3RgmqTZE',
		isActive: true,
		createdAt: new Date(),
		updatedAt: new Date()
	},

	// deb0Lqv1jZyg6m-ZfWiPy
	{
		id: 'out005_yes',
		coefficient: new Decimal(1.6),
		name: 'Да',
		eventId: 'deb0Lqv1jZyg6m-ZfWiPy',
		isActive: true,
		createdAt: new Date(),
		updatedAt: new Date()
	},
	{
		id: 'out005_no',
		coefficient: new Decimal(1.6),
		name: 'Нет',
		eventId: 'deb0Lqv1jZyg6m-ZfWiPy',
		isActive: true,
		createdAt: new Date(),
		updatedAt: new Date()
	},

	// C9DUrC-1LnTUjpNAnPruT
	{
		id: 'out006_yes',
		coefficient: new Decimal(1.6),
		name: 'Да',
		eventId: 'C9DUrC-1LnTUjpNAnPruT',
		isActive: true,
		createdAt: new Date(),
		updatedAt: new Date()
	},
	{
		id: 'out006_no',
		coefficient: new Decimal(1.6),
		name: 'Нет',
		eventId: 'C9DUrC-1LnTUjpNAnPruT',
		isActive: true,
		createdAt: new Date(),
		updatedAt: new Date()
	},

	// aJTpRPqET_e4swmbYPseq
	{
		id: 'out007_yes',
		coefficient: new Decimal(1.6),
		name: 'Да',
		eventId: 'aJTpRPqET_e4swmbYPseq',
		isActive: true,
		createdAt: new Date(),
		updatedAt: new Date()
	},
	{
		id: 'out007_no',
		coefficient: new Decimal(1.6),
		name: 'Нет',
		eventId: 'aJTpRPqET_e4swmbYPseq',
		isActive: true,
		createdAt: new Date(),
		updatedAt: new Date()
	},

	// hXOMXCXuCa9tWBN6BRiyJ
	{
		id: 'out008_yes',
		coefficient: new Decimal(1.6),
		name: 'Да',
		eventId: 'hXOMXCXuCa9tWBN6BRiyJ',
		isActive: true,
		createdAt: new Date(),
		updatedAt: new Date()
	},
	{
		id: 'out008_no',
		coefficient: new Decimal(1.6),
		name: 'Нет',
		eventId: 'hXOMXCXuCa9tWBN6BRiyJ',
		isActive: true,
		createdAt: new Date(),
		updatedAt: new Date()
	},

	// 6BMZx_P_gJ_Ry8QkclVlm
	{
		id: 'out009_yes',
		coefficient: new Decimal(1.6),
		name: 'Да',
		eventId: '6BMZx_P_gJ_Ry8QkclVlm',
		isActive: true,
		createdAt: new Date(),
		updatedAt: new Date()
	},
	{
		id: 'out009_no',
		coefficient: new Decimal(1.6),
		name: 'Нет',
		eventId: '6BMZx_P_gJ_Ry8QkclVlm',
		isActive: true,
		createdAt: new Date(),
		updatedAt: new Date()
	},

	// VERT-WFz2dXsVYBt4qqaI
	{
		id: 'out010_yes',
		coefficient: new Decimal(1.6),
		name: 'Да',
		eventId: 'VERT-WFz2dXsVYBt4qqaI',
		isActive: true,
		createdAt: new Date(),
		updatedAt: new Date()
	},
	{
		id: 'out010_no',
		coefficient: new Decimal(1.6),
		name: 'Нет',
		eventId: 'VERT-WFz2dXsVYBt4qqaI',
		isActive: true,
		createdAt: new Date(),
		updatedAt: new Date()
	},

	// 8bpOJgG5vfq_KR5mKYUqC
	{
		id: 'out011_yes',
		coefficient: new Decimal(1.6),
		name: 'Да',
		eventId: '8bpOJgG5vfq_KR5mKYUqC',
		isActive: true,
		createdAt: new Date(),
		updatedAt: new Date()
	},
	{
		id: 'out011_no',
		coefficient: new Decimal(1.6),
		name: 'Нет',
		eventId: '8bpOJgG5vfq_KR5mKYUqC',
		isActive: true,
		createdAt: new Date(),
		updatedAt: new Date()
	},

	// 3EJjd9RaN3Hi7c5NnCRCn
	{
		id: 'out012_yes',
		coefficient: new Decimal(1.6),
		name: 'Да',
		eventId: '3EJjd9RaN3Hi7c5NnCRCn',
		isActive: true,
		createdAt: new Date(),
		updatedAt: new Date()
	},
	{
		id: 'out012_no',
		coefficient: new Decimal(1.6),
		name: 'Нет',
		eventId: '3EJjd9RaN3Hi7c5NnCRCn',
		isActive: true,
		createdAt: new Date(),
		updatedAt: new Date()
	},

	// mabB9TFxLmZ5CXgyzZ5kt
	{
		id: 'out013_yes',
		coefficient: new Decimal(1.6),
		name: 'Да',
		eventId: 'mabB9TFxLmZ5CXgyzZ5kt',
		isActive: true,
		createdAt: new Date(),
		updatedAt: new Date()
	},
	{
		id: 'out013_no',
		coefficient: new Decimal(1.6),
		name: 'Нет',
		eventId: 'mabB9TFxLmZ5CXgyzZ5kt',
		isActive: true,
		createdAt: new Date(),
		updatedAt: new Date()
	},

	// PzAKx8tiofVbIRDVvDgIb
	{
		id: 'out014_yes',
		coefficient: new Decimal(1.6),
		name: 'Да',
		eventId: 'PzAKx8tiofVbIRDVvDgIb',
		isActive: true,
		createdAt: new Date(),
		updatedAt: new Date()
	},
	{
		id: 'out014_no',
		coefficient: new Decimal(1.6),
		name: 'Нет',
		eventId: 'PzAKx8tiofVbIRDVvDgIb',
		isActive: true,
		createdAt: new Date(),
		updatedAt: new Date()
	},

	// oXmvXC8qnfqVw8idNfGFs
	{
		id: 'out015_yes',
		coefficient: new Decimal(1.6),
		name: 'Да',
		eventId: 'oXmvXC8qnfqVw8idNfGFs',
		isActive: true,
		createdAt: new Date(),
		updatedAt: new Date()
	},
	{
		id: 'out015_no',
		coefficient: new Decimal(1.6),
		name: 'Нет',
		eventId: 'oXmvXC8qnfqVw8idNfGFs',
		isActive: true,
		createdAt: new Date(),
		updatedAt: new Date()
	},

	// 9TmQLlIuEP8ORNxjpRi3g
	{
		id: 'out016_yes',
		coefficient: new Decimal(1.6),
		name: 'Да',
		eventId: '9TmQLlIuEP8ORNxjpRi3g',
		isActive: true,
		createdAt: new Date(),
		updatedAt: new Date()
	},
	{
		id: 'out016_no',
		coefficient: new Decimal(1.6),
		name: 'Нет',
		eventId: '9TmQLlIuEP8ORNxjpRi3g',
		isActive: true,
		createdAt: new Date(),
		updatedAt: new Date()
	},

	// 5GuPTMXxe7NLdkSjgRVaJ
	{
		id: 'out017_yes',
		coefficient: new Decimal(1.6),
		name: 'Да',
		eventId: '5GuPTMXxe7NLdkSjgRVaJ',
		isActive: true,
		createdAt: new Date(),
		updatedAt: new Date()
	},
	{
		id: 'out017_no',
		coefficient: new Decimal(1.6),
		name: 'Нет',
		eventId: '5GuPTMXxe7NLdkSjgRVaJ',
		isActive: true,
		createdAt: new Date(),
		updatedAt: new Date()
	},

	// 6SxmrEyeG6lDAnO0mGvc5
	{
		id: 'out018_yes',
		coefficient: new Decimal(1.6),
		name: 'Да',
		eventId: '6SxmrEyeG6lDAnO0mGvc5',
		isActive: true,
		createdAt: new Date(),
		updatedAt: new Date()
	},
	{
		id: 'out018_no',
		coefficient: new Decimal(1.6),
		name: 'Нет',
		eventId: '6SxmrEyeG6lDAnO0mGvc5',
		isActive: true,
		createdAt: new Date(),
		updatedAt: new Date()
	},

	// pYsvFAnbcpSyRjvNxwh1e
	{
		id: 'out019_yes',
		coefficient: new Decimal(1.6),
		name: 'Да',
		eventId: 'pYsvFAnbcpSyRjvNxwh1e',
		isActive: true,
		createdAt: new Date(),
		updatedAt: new Date()
	},
	{
		id: 'out019_no',
		coefficient: new Decimal(1.6),
		name: 'Нет',
		eventId: 'pYsvFAnbcpSyRjvNxwh1e',
		isActive: true,
		createdAt: new Date(),
		updatedAt: new Date()
	},

	// gG7K3WJsVBGWW60B0DLi1
	{
		id: 'out020_yes',
		coefficient: new Decimal(1.6),
		name: 'Да',
		eventId: 'gG7K3WJsVBGWW60B0DLi1',
		isActive: true,
		createdAt: new Date(),
		updatedAt: new Date()
	},
	{
		id: 'out020_no',
		coefficient: new Decimal(1.6),
		name: 'Нет',
		eventId: 'gG7K3WJsVBGWW60B0DLi1',
		isActive: true,
		createdAt: new Date(),
		updatedAt: new Date()
	},

	// q9Q1Dnq_7iys-0EeFsJy1
	{
		id: 'out021_yes',
		coefficient: new Decimal(1.6),
		name: 'Да',
		eventId: 'q9Q1Dnq_7iys-0EeFsJy1',
		isActive: true,
		createdAt: new Date(),
		updatedAt: new Date()
	},
	{
		id: 'out021_no',
		coefficient: new Decimal(1.6),
		name: 'Нет',
		eventId: 'q9Q1Dnq_7iys-0EeFsJy1',
		isActive: true,
		createdAt: new Date(),
		updatedAt: new Date()
	},

	// l9ZK2UNO709HOdpVVrqWS
	{
		id: 'out022_yes',
		coefficient: new Decimal(1.6),
		name: 'Да',
		eventId: 'l9ZK2UNO709HOdpVVrqWS',
		isActive: true,
		createdAt: new Date(),
		updatedAt: new Date()
	},
	{
		id: 'out022_no',
		coefficient: new Decimal(1.6),
		name: 'Нет',
		eventId: 'l9ZK2UNO709HOdpVVrqWS',
		isActive: true,
		createdAt: new Date(),
		updatedAt: new Date()
	},

	// 6a9DKfnQgf4r9h7Q7CsKt
	{
		id: 'out023_yes',
		coefficient: new Decimal(1.6),
		name: 'Да',
		eventId: '6a9DKfnQgf4r9h7Q7CsKt',
		isActive: true,
		createdAt: new Date(),
		updatedAt: new Date()
	},
	{
		id: 'out023_no',
		coefficient: new Decimal(1.6),
		name: 'Нет',
		eventId: '6a9DKfnQgf4r9h7Q7CsKt',
		isActive: true,
		createdAt: new Date(),
		updatedAt: new Date()
	}
]

async function seed() {
	console.log('Seeder started')

	try {
		await prisma.$transaction(async tx => {
			await tx.outcome.deleteMany()
			await tx.event.deleteMany()
			await tx.category.deleteMany()
			await tx.category.createMany({
				data: CATEGORIES
			})
			await tx.event.createMany({
				data: EVENTS
			})
			await tx.outcome.createMany({
				data: OUTCOMES
			})
		})
		console.log('Seeder successfully completed')
	} catch (e) {
		console.log('Seeder failed')
		console.log(e)
		process.exit(1)
	}
}

seed()

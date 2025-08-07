import {Router} from 'express';
import { getUrl, mapUrl, redirectUrl } from '../controllers/urlRoute.controllers.js';
import { validateSchema } from '../middleware/validateSchema.middleware.js';
import { urlMapSchema } from '../validations/url.validation.js';
const urlRoutes = Router();

// Redirect from shortened url to actual url
urlRoutes.get('/:url', redirectUrl);
// Get the details about a partcular url based on its shortened url
// Check if user is admin here
urlRoutes.get('/:url', getUrl);
// Shorten url and shorten it
urlRoutes.post('/', validateSchema(urlMapSchema), mapUrl);



export {urlRoutes}
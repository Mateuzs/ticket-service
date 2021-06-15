import { Router } from "express";

import {
  amendTicket,
  createTicket,
  getTicket,
  getTickets,
  verifyTicket,
} from "./controllers";

import {
  ENDPOINT_API_AMEND_TICKET,
  ENDPOINT_API_CREATE_TICKET,
  ENDPOINT_API_GET_TICKET,
  ENDPOINT_API_GET_TICKETS,
  ENDPOINT_API_VERIFY_TICKET,
} from "./constants";
import ticketIdParamValidator from "./middlewares/ticketIdParamValidator";

const router = Router();

router.route(ENDPOINT_API_CREATE_TICKET).post(createTicket);
router.route(ENDPOINT_API_GET_TICKETS).get(getTickets);

router
  .route(ENDPOINT_API_GET_TICKET)
  .get(ticketIdParamValidator)
  .get(getTicket);

router
  .route(ENDPOINT_API_VERIFY_TICKET)
  .put(ticketIdParamValidator)
  .put(verifyTicket);

router
  .route(ENDPOINT_API_AMEND_TICKET)
  .put(ticketIdParamValidator)
  .put(amendTicket);

export default router;

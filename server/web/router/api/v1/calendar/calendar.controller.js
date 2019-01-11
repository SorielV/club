import { Calendar, Event } from './../../../../../models/calendar'

const Visibility = {
  PUBLIC: 0,
  PRIVATE: 1
}

export const CalendarAPI = {
  // TODO: Cascade DROP
  async getCalendar(req, res ,next) {
    const {
      params: { id = null },
      query: { idClub = null }
    } = req

    let items
    if (id) {
      items = await Event.getOne({ id })
    } else {
      if (req.member) {
        items = await Event.get({ idClub })
      } else {
        items = await Event.get({ idClub, visibility: Visibility.PUBLIC })
      }
    }

    return res
      .status(200)
      .json({ data: items })
      .end()    
  }
}

/*
  TODO: Analisis Ambiguedad en Calendario 
  -- [1, inf] calendario por Club? [idClub, [idClub, calendarId]]
*/
export const EventAPI = {
  async addEvent(req, res ,next) {
    const {
      query: { idClub = null }
    } = req

    // Get calendarId from Calendar
    const { calendarId } = await Calendar.getOne({ idClub })
    const item = await new Event({ ...req.body, calendarId }).save()

    return res
      .status(201)
      .json({ data: item })
      .end()
  },
  async getEvent(req, res ,next) {
    // TODO: query { idCLub } Eventos por grupo
    const {
      params: { id = null },
      query: { calendarId = null, ...options }
    } = req

    let items
    if (id) {
      items = await Event.getOne({ id })
    } else {
      if (req.member) {
        items = await Event.get({ ...options, calendarId })
      } else {
        items = await Event.get({ ...options, visibility: Visibility.PUBLIC })
      }
    }

    return res
      .status(200)
      .json({ data: items })
      .end()
  },
  async updateEvent(req, res ,next) {
    const {
      params: { id = null },
      query: { idClub = null }
    } = req

    const item = await Event.update(req.body, { id, idClub })

    return res
      .status(200)
      .json({ data: item })
      .end()
  },
  async deleteEvent(req, res ,next) {
    const {
      params: { id = null },
      query: { idClub = null }
    } = req

    await Event.delete({ id, idClub })

    return res
      .status(204)
      .end()
  }
}

export default CalendarAPI

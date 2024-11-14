import { Request, Response } from "express";

let events: {
  id: number;
  title: string;
  date: string;
  location: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;
}[] = [];

export const getAllEvents = (req: Request, res: Response): void => {
  res.status(200).json(events);
};

export const getEvent = (req: Request, res: Response) => {
  const eventId = parseInt(req.params.id);
  const event = events.find((event) => event.id === eventId);

  if (!event) {
    res.status(404).json({ message: "Event not found" });
  }

  res.status(200).json(event);
};

export const createEvent = (req: Request, res: Response) => {
  const { title, date, location, description } = req.body;

  if (!title || !date || !location || !description) {
    res.status(400).json({
      message: "Event title, date, location, and description are required",
    });
  }

  const newEvent = {
    id: events.length + 1,
    title,
    date,
    location,
    description,
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  events.push(newEvent);
  res.status(201).json(newEvent);
};

export const deleteEvent = (req: Request, res: Response) => {
  const eventId = parseInt(req.params.id);

  const index = events.findIndex((event) => event.id === eventId);

  if (index === -1) {
    res.status(404).json({ message: "Event not found" });
  }

  events.splice(index, 1);
  res.status(200).json({ message: "Event deleted successfully" });
};

export const updateEvent = (req: Request, res: Response) => {
  const eventId = parseInt(req.params.id);
  const { title, date, location, description } = req.body;

  const index = events.findIndex((event) => event.id === eventId);

  if (index === -1) {
    res.status(404).json({ message: "Event not found" });
  }

  const updatedEvent = {
    ...events[index],
    title: title ?? events[index].title,
    date: date ?? events[index].date,
    location: location ?? events[index].location,
    description: description ?? events[index].description,
    updatedAt: new Date(),
  };

  events[index] = updatedEvent;

  res.status(200).json(updatedEvent);
};

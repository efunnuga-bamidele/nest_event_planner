import { Controller, Get, Post, Patch, Delete } from "@nestjs/common";

@Controller('/events') //part prefix
export class EventsController {

    @Get()
    findAll() { }

    @Get()
    findOne() { }

    @Post()
    create() { }

    @Patch()  //@Put update all resources @Patch update specific property of the resources
    update() { }

    @Delete()
    remove() { }
}
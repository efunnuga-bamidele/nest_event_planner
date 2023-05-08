import { Controller, Get, Post, Patch, Delete, Param, Body, HttpCode } from "@nestjs/common";
import { CreateEventDto } from "./create-event.dto";

@Controller('/events') //part prefix
export class EventsController {

    @Get()
    findAll() { 
        return [
            {id:1, name: "First Event"},
            {id:2, name: "Second Event"},
        ];
    }

    @Get(':id')
    findOne(@Param('id') id: number) {
        return {id:1, name: "First Event"};
    }

    @Post()
    create(@Body() input: CreateEventDto) {
        return input;
    }

    @Patch(':id')  //@Put update all resources @Patch update specific property of the resources
    update(@Param('id') id: number, @Body() input) { 
        return input;
    }

    @Delete(':id')
    @HttpCode(204)
    remove(@Param('id') id: number) { }
}
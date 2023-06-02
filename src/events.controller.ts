import { Controller, Get, Post, Patch, Delete, Param, Body, HttpCode, ParseIntPipe, ValidationPipe } from "@nestjs/common";
import { CreateEventDto } from "./create-event.dto";
import { UpdateEventDto } from "./update-event.dto";
import { Event } from "./event.entity";
import { Like, MoreThan, Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";

@Controller('/events') //part prefix
export class EventsController {
    // private events: Event[] = [];
    constructor(
        @InjectRepository(Event)
        private readonly repository: Repository<Event>
    ) {}

    @Get()
    async findAll() {
        return await this.repository.find();
    }

    @Get('/practice')
    async practice(){
        return this.repository.find({
            select: ['id', 'when'],
            // where: {id: 3}
            where: [{
                id: MoreThan(2),
                when: MoreThan(new Date('2021-02-12T13:00:00'))
            }, {
                description: Like('%meet%')
            }],
            take: 2, //limit property
            // skip:0 //offset property
            order: {
                id: 'DESC'
            }
        })
    }

    @Get(':id')
    async findOne(@Param('id') id) {
        console.log(typeof(id))
        return await this.repository.findOne({
            where: [{'id' : id}]
        });
    }

    @Post()
    async create(@Body(ValidationPipe) input: CreateEventDto) {
       return await this.repository.save({
            ...input,
            when: new Date(input.when),
        });
    }

    @Patch(':id')  //@Put update all resources @Patch update specific property of the resources
    async update(@Param('id') id, @Body() input: UpdateEventDto) {
        const event = await this.repository.findOne(id);

        return await this.repository.save({
            ...event,
            ...input,
            when: input.when ? new Date(input.when) : event.when
        });
    }

    @Delete(':id')
    @HttpCode(204)
    async remove(@Param('id') id) {
        const event = await this.repository.findOne(id);
        await this.repository.remove(event);

     }
}
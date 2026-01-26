import { Body, Controller, Get, Query, Req, UseGuards } from "@nestjs/common";
import { LeadBehaviourService } from "./lead-behaviour.service";
import { JwtAuthGuard } from "src/auth/jwt.guard";

@Controller('leads')
export class LeadBehaviourController {
   constructor(private readonly leadBehaviourService: LeadBehaviourService) {}

   @UseGuards(JwtAuthGuard)
     @Get("")
     findFilteredLeadByQuery(@Query() limit, @Query() page, @Query() filterDto: any, @Req() req) {

       console.log("list leads");
       const user = req.user;

       return this.leadBehaviourService.findByBehaviourLinkWithFilter(user.userId, filterDto, limit, page);
     }
     
     @UseGuards(JwtAuthGuard)
  @Get(':id')
  findLeadById(@Req() req, @Body() id: string) {
    const user = req.user;
    return this.leadBehaviourService.findLeadById(user.userId, id);
  }
}
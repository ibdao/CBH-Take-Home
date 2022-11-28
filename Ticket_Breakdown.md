# Ticket Breakdown
We are a staffing company whose primary purpose is to book Agents at Shifts posted by Facilities on our platform. We're working on a new feature which will generate reports for our client Facilities containing info on how many hours each Agent worked in a given quarter by summing up every Shift they worked. Currently, this is how the process works:

- Data is saved in the database in the Facilities, Agents, and Shifts tables
- A function `getShiftsByFacility` is called with the Facility's id, returning all Shifts worked that quarter, including some metadata about the Agent assigned to each
- A function `generateReport` is then called with the list of Shifts. It converts them into a PDF which can be submitted by the Facility for compliance.

## You've been asked to work on a ticket. It reads:

**Currently, the id of each Agent on the reports we generate is their internal database id. We'd like to add the ability for Facilities to save their own custom ids for each Agent they work with and use that id when generating reports for them.**


Based on the information given, break this ticket down into 2-5 individual tickets to perform. Provide as much detail for each ticket as you can, including acceptance criteria, time/effort estimates, and implementation details. Feel free to make informed guesses about any unknown details - you can't guess "wrong".


You will be graded on the level of detail in each ticket, the clarity of the execution plan within and between tickets, and the intelligibility of your language. You don't need to be a native English speaker, but please proof-read your work.

## Your Breakdown Here
Currently, we our list of reports contains the internal database id (the id that is given on record creation for each agent). 
We want the agents to have their own ID corresponding to the Facility they work with when generating the report for them. 

First, we want to create a way for the Facilities to assign an id to each of their agents. This should be done when facilities assign shifts to an agent. There should then be a foreign key between the facility-given-agent-id and the actual agent id so that we can keep track of which agent is assigned to which shift. 

Once we have a relationship between the facility-given-id and they actual agent id, we can then assign agents to shifts and keep track of how many shifts they have been assigned. The problem that arises is if there are many facilities, then one agent can have many id's given by their facility.

For each facility, we call `getShiftsByFacility` that would return all the shifts and the facility-given-agent-id's that worked those shifts. I expect `generateReport` to contain the facility-given-agent-id so we will need to build a function that can read the facility-given-agent-id to the actual agent id that is stored in the database so that we can count the number of shifts an agent worked. 

From the shift list returned by `getShiftsByFacility`, we can build a `shiftsWorkedByAgent` function that will count the number of shifts that an agent worked given the relationship between their facility-given-agent-id and their database agent id. 

I expect it to look something like this:
    function shiftsWorkedByAgent(shifts){
        let agents = getAllAgents() // returns a list of agents from our database

        // for each agent we want to 
        a. see if they work at the facility 
        b. see if they were assigned a shift 
        c. count each shift they were assigned

        for each agent in agents {

            // if the agent works at the facility count the number of shifts
            if (facility.id === agent.facility.id) {
                for shift in shifts {
                    if agent.id === shift.agent.id { //shift.agent.id would also be the facility-given-id 
                        count++ 
                    }
                }
            }
        }
        return count; 
    }

Now, we have a list of shifts and a report for each facility that has a count of shifts worked by an agent. 
At a high-level what I tried to do was to make a relationship between a facility-given-agent-id that will be moved with the list of shifts and report at a given facility. We then can use this relationship to map to the database agent id and finally count the number of shifts that an agent worked. What this requires is to make additional columns in an agent record so that it stores which facilities and agent works at and their facility-given-agent-id. In the Facilities table it would store the custom agent id that will be in relation to the Agents table. The Shifts table would have the custom agent id and the shift id. 
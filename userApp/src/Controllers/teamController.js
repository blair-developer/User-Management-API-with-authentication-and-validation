const Team = require("../models/Team");

const Task = require("../models/Task");

const User = require("../models/User");

const Activity = require("../models/Activity");



/*
========================================
CREATE TEAM
POST /teams/create
========================================
*/

exports.createTeam = async (req, res) => {

    try {

        const newTeam = await Team.create({

            teamName: req.body.teamName,

            description: req.body.description,

            owner: req.session.userId,

            members: [req.session.userId]

        });


        // Activity log
        await Activity.create({

            user: req.session.userId,

            action: `Created team ${req.body.teamName}`

        });

        res.redirect(`/teams/${newTeam._id}`);

    } catch (err) {

        console.error(err);

        res.status(500).send("Error creating team");

    }

};



/*
========================================
JOIN TEAM
POST /teams/join/:id
========================================
*/

exports.joinTeam = async (req, res) => {

    try {

        const team = await Team.findById(req.params.id);

        if (!team) {

            return res.send("Team not found");

        }

        // Prevent duplicate members
        if (
            team.members.includes(req.session.userId)
        ) {

            return res.send("Already a member");

        }

        team.members.push(req.session.userId);

        await team.save();


        // Activity log
        await Activity.create({

            user: req.session.userId,

            action: `Joined team ${team.teamName}`

        });

        res.redirect(`/teams/${team._id}`);

    } catch (err) {

        console.error(err);

        res.status(500).send("Error joining team");

    }

};



/*
========================================
TEAM DASHBOARD
GET /teams/:id
========================================
*/

exports.getTeamDashboard = async (req, res) => {

    try {

        const team = await Team.findById(req.params.id)

            .populate("members")

            .populate("owner");

        if (!team) {

            return res.send("Team not found");

        }

        // Team tasks
        const tasks = await Task.find({

            teamId: team._id

        }).populate("assignedTo");


        // Team activity
        const activities = await Activity.find()

            .sort({ createdAt: -1 })

            .limit(10);


        // Analytics
        const totalTasks = tasks.length;

        const completedTasks = tasks.filter(
            task => task.status === "Completed"
        ).length;

        const pendingTasks = tasks.filter(
            task => task.status === "Pending"
        ).length;

        const progress =
            totalTasks === 0
                ? 0
                : Math.floor(
                    (completedTasks / totalTasks) * 100
                );


        res.render("teams/dashboard", {

            username: req.session.username,

            team,

            tasks,

            activities,

            totalTasks,

            completedTasks,

            pendingTasks,

            progress

        });

    } catch (err) {

        console.error(err);

        res.status(500).send("Error loading team dashboard");

    }

};



/*
========================================
INVITE MEMBERS
POST /teams/invite
========================================
*/

exports.inviteMember = async (req, res) => {

    try {

        const {

            teamId,

            username

        } = req.body;


        const user = await User.findOne({

            name: username

        });

        if (!user) {

            return res.send("User not found");

        }


        const team = await Team.findById(teamId);

        if (!team) {

            return res.send("Team not found");

        }

        // Prevent duplicate members
        if (team.members.includes(user._id)) {

            return res.send("User already in team");

        }

        team.members.push(user._id);

        await team.save();


        // Activity log
        await Activity.create({

            user: req.session.userId,

            action: `Invited ${username} to ${team.teamName}`

        });

        res.redirect(`/teams/${team._id}`);

    } catch (err) {

        console.error(err);

        res.status(500).send("Error inviting member");

    }

};
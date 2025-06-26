const user = require("../api/models/user.model");
const audio = require("../api/models/audio.model");
const session = require("../api/models/session.model");
const track = require("../api/models/track.model");
const initializeRelations = () => {

    try {

        user.hasMany(session);
        session.belongsTo(user);

        session.belongsToMany(audio, { through: "session_audio" });
        audio.belongsToMany(session, { through: "session_audio" });

        audio.belongsToMany(track, { through: "track_audio" });
        track.belongsToMany(audio, { through: "track_audio" });

        console.log("Relations added to models");
    } catch (error) {
        console.log(error);
    }
};

module.exports = initializeRelations;
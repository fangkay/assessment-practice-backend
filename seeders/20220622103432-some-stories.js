"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      "stories",
      [
        {
          name: "Munro",
          content:
            "It wasn't an ideal situation. Martin hadn't really thought it through. He'd received the phone call early that morning, leaving him just enough time to pack a bag, contact the office and drive to Chelmsford to pick up Joel. One thing he hated to admit in front of Alex was that he didn't have a clue what he was doing.",
          imageUrl:
            "http://www.eastoftheweb.com/short-stories/UBooks/Covers/c_Munr1311_ip_cov.jpg",
          createdAt: new Date(),
          updatedAt: new Date(),
          spaceId: 1,
        },
        {
          name: "The Clinic",
          content:
            "As expected on a Monday morning, the clinic's waiting room was crowded. There were a few old couples who were quiet, with the wives generally reading and the husbands looking around or watching TV. But the bulk of patients were mothers and children, of whom few were quiet. The younger ones would start to run and laugh before their mothers would order them to sit down and hush, often trying to get them to read one of the many children's books in the reading rack. The secretaries and nurses behind the glass partition were louder with a constant stream of phone calls, patients checking in and out, gossip, and laughter.",
          imageUrl:
            "http://www.eastoftheweb.com/short-stories/UBooks/Covers/c_Clin1314_ip_cov.jpg",
          createdAt: new Date(),
          updatedAt: new Date(),
          spaceId: 1,
        },
        {
          name: "Invisible",
          content:
            "The lorry's cab eased over the speed bump giving its occupants a gentle bounce. Mick glanced across to his side mirror, checking the trailer followed safely, and saw the security gate come down as he cleared the yard.",
          imageUrl:
            "http://www.eastoftheweb.com/short-stories/UBooks/Covers/c_Invi1313_ip_cov.jpg",
          createdAt: new Date(),
          updatedAt: new Date(),
          spaceId: 2,
        },
        {
          name: "Remains",
          content:
            "Deacon Park is where they bury the bodies. For a cold-blooded killer, a huge tract of wild land in the middle of the city can be an indispensable resource.",
          imageUrl:
            "http://www.eastoftheweb.com/short-stories/UBooks/Covers/c_Rema1312_ip_cov.jpg",
          createdAt: new Date(),
          updatedAt: new Date(),
          spaceId: 2,
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("stories", null, {});
  },
};

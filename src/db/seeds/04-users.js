exports.seed = async function(knex) {
  return knex("users").insert([
    {
      username: "bongojava",
      email: "bongoboingo1997@gmail.com",
      points: 0,
      survey_done: false,
      avatar_id: 1,
      survey_index: 1
    },
    {
      username: "sneakerhead1972",
      email: "sneakerhead1972@gmail.com",
      points: 1000,
      survey_done: true,
      avatar_id: 2,
      survey_index: 1
    },
    {
      username: "codysmiles",
      email: "thecodysmiles@gmail.com",
      points: 200,
      survey_done: false,
      avatar_id: 5,
      survey_index: 1
    },
  ]);
};

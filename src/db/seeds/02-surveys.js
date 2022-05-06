exports.seed = async function(knex) {
  return knex("surveys").insert([
    {
      survey_date: "2022-05-04",
      survey_name: "Intern Designs 01",
      survey_description: "The first batch of designs from our interns.",
    },
    {
      survey_date: "2022-05-10",
      survey_name: "Intern Designs 02",
      survey_description: "The second batch of designs from our interns.",
    },
    {
      survey_date: "2022-05-12",
      survey_name: "Intern Designs 03",
      survey_description: "The third batch of our intern designs."
    },
  ]);
};

exports.seed = function(knex) {
  return knex('avatars').insert([
    {
      avatar_url: "https://cdn-icons-png.flaticon.com/512/7649/7649593.png",
      avatar_name: "Ocelot",
    },
    {
      avatar_url: "https://cdn-icons-png.flaticon.com/512/7177/7177913.png",
      avatar_name: "Fuego",
    },
    {
      avatar_url: "https://cdn-icons-png.flaticon.com/512/7356/7356390.png",
      avatar_name: "Monke 01",
    },
    {
      avatar_url: "https://cdn-icons-png.flaticon.com/512/7356/7356400.png",
      avatar_name: "Monke 02",
    },
    {
      avatar_url: "https://cdn-icons-png.flaticon.com/512/4193/4193288.png",
      avatar_name: "Panda",
    },
    {
      avatar_url: "https://cdn-icons-png.flaticon.com/512/4193/4193310.png",
      avatar_name: "Croc",
    },
    {
      avatar_url: "https://cdn-icons-png.flaticon.com/512/4540/4540472.png",
      avatar_name: "Whale",
    },
    {
      avatar_url: "https://cdn-icons-png.flaticon.com/512/5151/5151483.png",
      avatar_name: "Mic Drop",
    },
  ]);
};

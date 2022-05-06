exports.seed = function(knex) {
  return knex('avatars').insert([
    {
      avatar_url: "https://cdn-icons.flaticon.com/png/512/924/premium/924915.png?token=exp=1651671327~hmac=3743f4b58501b819928ad0fb2f03d122",
      avatar_name: "Hacker",
    },
    {
      avatar_url: "https://cdn-icons.flaticon.com/png/512/924/premium/924876.png?token=exp=1651671452~hmac=eec5a00f7db8a5b916144a3be11a100b",
      avatar_name: "Heisenberg",
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

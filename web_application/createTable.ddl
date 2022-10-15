CREATE TABLE web_counter_h-yokoyama-eiwa.counts (
  id int UNSIGNED NOT NULL DEFAULT '0',
  created_at datetime NOT NULL DEFAULT '0000-00-00 00:00:00',
  updated_at datetime NOT NULL DEFAULT '0000-00-00 00:00:00',
  count int UNSIGNED NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
);

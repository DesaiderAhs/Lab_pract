insert into public.platforms (id, name)
values
  ('PC', 'ПК (Windows / Linux)'),
  ('PS5', 'PlayStation 5'),
  ('Xbox', 'Xbox Series X/S'),
  ('Switch', 'Nintendo Switch'),
  ('Mobile', 'Мобильные устройства')
on conflict (id) do update
set name = excluded.name;
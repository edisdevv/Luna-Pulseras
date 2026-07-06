-- Ejemplo: después de subir una foto al bucket "productos" en Storage,
-- copia su URL pública (Storage > click en el archivo > "Copy URL")
-- y úsala aquí abajo. Repite esto por cada pulsera de tu catálogo.

insert into productos (nombre, descripcion, precio, piedra, imagen_url, stock)
values (
  'Pulsera Amanecer',
  'Cuarzo rosa anudado con hilo encerado color arena. Ajustable.',
  9990,
  'Cuarzo rosa',
  'https://TU-PROYECTO.supabase.co/storage/v1/object/public/productos/amanecer.jpg',
  5
);

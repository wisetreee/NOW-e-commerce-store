import type {StructureResolver} from 'sanity/structure'

// https://www.sanity.io/docs/structure-builder-cheat-sheet
export const structure: StructureResolver = (S) =>
  S.list()
    .title('Магазин')
    .items([
      S.documentTypeListItem('hero')
        .title('Шапка сайта')
        .child(
          S.document()
            .schemaType('hero')
            .documentId('hero')),
            
      S.divider(),
      
      ...S.documentTypeListItems().filter(
        (item) => item.getId() && ![ 'hero' ].includes(item.getId()!),
      ),
    ])

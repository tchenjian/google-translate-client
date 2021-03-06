/// <reference path="../../typings/index.d.ts" />
'use strict';

angular.module('googleTranslateClientAppMocksInternal', [])
  .service('mocksResponseBuilder', () => {
    let buildTranslationResponse = (translation: string, originalText: string, transliteration: string = '', synonyms: string[] = []): any => {
      return {
        extract: {
          translation: translation,
          actualQuery: originalText,
          resultType: 0,
          transliteration: transliteration,
          synonyms: synonyms
        },
        originalResponse: null
      };
    };

    let singleLang = (targetLang, query) => {
      switch (targetLang) {
        case 'fr':
          return buildTranslationResponse('chien', query, '', ['chien', 'mâle', 'fille moche']);
        case 'ar':
          return buildTranslationResponse('كلب', query, 'kalb', ['كلب', 'كلاب']);
        case 'es':
          return buildTranslationResponse('perro', query);
        case 'zh-CN':
          return buildTranslationResponse('狗', query, 'Gǒu');
        case 'ru':
          return buildTranslationResponse('собака', query, 'sabaka');
        case 'pt':
          return buildTranslationResponse('cachorro', query);
        case 'en':
          return buildTranslationResponse('dog', query);
        default:
          return buildTranslationResponse('Dog', query);
      }
    };

    return (data: any) => {
      let isSingleLang = !!data.targetLang;

      if (isSingleLang) {
        return singleLang(data.targetLang, data.query);
      } else {
        //  TODO: return the entire array
        return data.targetLangs.map(lang => singleLang(lang, data.query))[0];
      }
    };
  })
  .constant('mockLanguagesResponse', [
    {
      name: 'Arabic',
      code: 'ar'
    },
    {
      name: 'Chinese',
      code: 'zh-CN'
    },
    {
      name: 'English',
      code: 'en'
    },
    {
      name: 'French',
      code: 'fr'
    },
    {
      name: 'Portuguese',
      code: 'pt'
    },
    {
      name: 'Russian',
      code: 'ru'
    },
    {
      name: 'Spanish',
      code: 'es'
    }
  ]);

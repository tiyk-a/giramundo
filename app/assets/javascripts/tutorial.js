// REFERENCE: https://qiita.com/3isawa/items/91fd5209e636e8956628

function tutorial(){
  introJs().setOptions({
      'nextLabel': '>>',
      'prevLabel': '<<',
      'skipLabel': 'x',
      'doneLabel': 'Done',
      'exitOnOverlayClick': false,
      'showStepNumbers': false,

      // TUTORIAL STEPS
      steps: [
        {
          // INTRO: WHAT TO SHOW
          // STEP 0
          intro: "<p style='font-size: 1rem;'>こんにちは！ご訪問ありがとう♡<br>このサイトの使い方を紹介します◡̈</p>"
        },
        {
          // INTRO: WHAT TO SHOW
          // STEP 0
          intro: "<p style='font-size: 1rem;'>ここは<b>世界中のコンサート情報を<br>検索するサイト</b>です。主な機能は<br><br>①コンサート情報の確認<br>②アーティストのコンサート検索（要ログイン）<br><br>です。</p>"
        },
        {
          // INTRO: WHAT TO SHOW
          // STEP 0
          intro: "<p style='font-size: 1rem;'>このチュートリアルでは、<br>現在のトップページにおいての<br><b>①コンサート情報の確認</b>の方法<br>についてご説明します。</p>"
        },
        {
          element: '#introjs-step2',
          intro: "<p style='font-size: 1rem;'>情報確認済みのコンサート情報が並んでいます。<br>クリックすると詳細ページに飛べるよ◟̆◞̆♡</p>"
        },
        {
          element: '#introjs-step3',
          intro: "<p style='font-size: 1rem;'>表示のコントロールができます。<br>デフォルトは'Asc'で<br>日付が今日から近い順です。<br>'Desc'を選択すると、<br>一番遠い未来のコンサートから表示されます</p>"
        },
        {
          element: '#introjs-step4',
          intro: "<p style='font-size: 1rem;'>'Plan'ボタンを押すと、<br>各コンサートのコンフリクトが確認できます。<br>他の気になるコンサートと<br>日時が被っていないか、<br>チェックしてね◟̽◞̽*</p>"
        },
        {
          element: '#introjs-step7',
          intro: "<p style='font-size: 1rem;'>今後、チュートリアルは<br>ここのボタンから見ることができます。</p>"
        },
        {
          // ELEMENT: CONNECTOR (DIRECT BY SELECTOR)
          element: '#introjs-menu1',
          intro: "<p style='font-size: 1rem;'>'VENUES'ページでは<br>コンサート会場一覧を<br>見ることができます。</p>"
        },
        {
          // ELEMENT: CONNECTOR (DIRECT BY SELECTOR)
          element: '#introjs-menu2',
          intro: "<p style='font-size: 1rem;'>emailでユーザー登録＆ログインをすると、<br>アーティスト検索もできるようになります。</p>"
        },
        {
          // ELEMENT: CONNECTOR (DIRECT BY SELECTOR)
          element: '#introjs-menu3',
          intro: "<p style='font-size: 1rem;'>このサイトについての<br>Aboutページはこちらから。<br>ログインすると見れません。</p>"
        },
        {
          // INTRO: WHAT TO SHOW
          // STEP 0
          intro: "<p style='font-size: 1rem;'>トップページのチュートリアルはこれで終わりです。<br><br>ログインページには<b>テストユーザーアカウント</b>を用意しているので、<br><br>ユーザー登録は嫌だなぁという方も<br>どうぞおためしください</p>"
        },
        {
          intro: "<p style='font-size: 1rem;'>使用方法が分かりにくい点やバグ、<br>認識しております。<br><br>気になる点がございましたら<br>ご意見いただけると幸いです。<br><br><span style='font-size: 0.6rem'>（フォーム未設置なのでお会いできた時に…◟̽◞̽*）</span></p>"
        },
        {
          intro: "<p style='font-size: 2.5rem; text-align: center; font-weight: 600;'>𝙲𝙸𝙰𝙾!<br><br><span style='font-weight: 300; font-size: 2rem;'>٩(ˊᗜˋ*)و</span></p>"
        },
      ]
      // START CALLS THIS FUNCTION ABOVE
    }).start().onexit(function() {
    // 1ST ARG: DATA "KEY" THAT WOULD BE ADDED
    // 2ND ARG: "VALUE" THAT WOULD BE INPUTTED
    // EXPIRES :DATE
    // PATH: SELECT THE PATH THAT WOULD ACTIVATE VALUE
    Cookies.set('SampleFlg', 'on', { expires: 30,path: '/' });
  });
};

function sp_tutorial(){
  $('#sp-menu').css('display', 'none');
  introJs().setOptions({
      'nextLabel': '>>',
      'prevLabel': '<<',
      'skipLabel': 'x',
      'doneLabel': 'Done',
      'exitOnOverlayClick': false,
      'showStepNumbers': false,

      // TUTORIAL STEPS
      steps: [
        {
          // INTRO: WHAT TO SHOW
          // STEP 0
          intro: "<p style='font-size: 0.8rem;'>こんにちは！ご訪問ありがとう♡<br>このサイトの使い方を紹介します◡̈</p>"
        },
        {
          // INTRO: WHAT TO SHOW
          // STEP 0
          intro: "<p style='font-size: 0.8rem;'>ここは<b>世界中のコンサート情報を<br>検索するサイト</b>です。主な機能は<br><br>①コンサート情報の確認<br>②アーティストのコンサート検索（要ログイン）<br><br>です。</p>"
        },
        {
          // INTRO: WHAT TO SHOW
          // STEP 0
          intro: "<p style='font-size: 0.8rem;'>このチュートリアルでは、<br>現在のトップページにおいての<br><b>①コンサート情報の確認</b>の方法<br>についてご説明します。</p>"
        },
        {
          element: '#introjs-step2',
          intro: "<p style='font-size: 0.8rem;'>情報確認済みのコンサート情報が並んでいます。<br>クリックすると詳細ページに飛べるよ◟̆◞̆♡</p>"
        },
        {
          element: '#introjs-step3',
          intro: "<p style='font-size: 0.8rem;'>表示のコントロールができます。<br>デフォルトは'Asc'で<br>日付が今日から近い順です。<br>'Desc'を選択すると、<br>一番遠い未来のコンサートから表示されます</p>"
        },
        {
          element: '#introjs-step4',
          intro: "<p style='font-size: 0.8rem;'>'Plan'ボタンを押すと、<br>各コンサートのコンフリクトが確認できます。<br>他の気になるコンサートと<br>日時が被っていないか、<br>チェックしてね◟̽◞̽*</p>"
        },
        {
          intro: "<p style='font-size: 0.8rem;'>emailでユーザー登録＆ログインをすると、<br>アーティスト検索もできるようになります。</p>"
        },
        {
          intro: "<p style='font-size: 0.8rem;'>トップページのチュートリアルはこれで終わりです。<br><br>ログインページには<b>テストユーザーアカウント</b>を用意しているので、<br><br>ユーザー登録は嫌だなぁという方も<br>どうぞおためしください</p>"
        },
        {
          intro: "<p style='font-size: 0.8rem;'>使用方法が分かりにくい点やバグ、<br>認識しております。<br><br>気になる点がございましたら<br>ご意見いただけると幸いです。<br><br><span style='font-size: 0.6rem'>（フォーム未設置なのでお会いできた時に…◟̽◞̽*）</span></p>"
        },
        {
          intro: "<p style='font-size: 2rem; text-align: center; font-weight: 600;'>𝙲𝙸𝙰𝙾!<br><br><span style='font-weight: 300; font-size: 2rem;'>٩(ˊᗜˋ*)و</span></p>"
        },
      ]
      // START CALLS THIS FUNCTION ABOVE
    }).start().onexit(function() {
    // 1ST ARG: DATA "KEY" THAT WOULD BE ADDED
    // 2ND ARG: "VALUE" THAT WOULD BE INPUTTED
    // EXPIRES :DATE
    // PATH: SELECT THE PATH THAT WOULD ACTIVATE VALUE
    Cookies.set('SampleFlg', 'on', { expires: 30,path: '/' });
  });
};

// START TUTORIAL WHEN THE "TUTORIAL" BUTTON WAS TOUCHED
$(document).on('click', '#tutorial', function(){
  tutorial();
});

$(document).on('click', '#sp_tutorial', function(){
  sp_tutorial();
});


$(function(){
  if (Cookies.get('SampleFlg') != 'on' && !navigator.userAgent.match(/(iPhone|iPad|iPod|Android)/)) {
    tutorial();
  }
});
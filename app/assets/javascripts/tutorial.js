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
          intro: "こんにちは！ご訪問ありがとう♡<br>トップページの使い方を紹介します◡̈"
        },
        {
          // ELEMENT: CONNECTOR (DIRECT BY SELECTOR)
          element: '#introjs-step1',
          intro: "ここにはピックアップコンサートが流れます。<br>毎度違うコンサートが出るので、大好きなアーティストを見つけてね"
        },
        {
          element: '#introjs-step2',
          intro: "ここには、既に確認済みのコンサート情報が並んでいます。<br>クリックすると詳細に飛べるよ◟̆◞̆♡"
        },
        {
          element: '#introjs-step3',
          intro: "ここで表示のコントロールができます。<br>デフォルトは'Asc'で日付が今日から近い順です。<br>'Desc'を選択すると、一番遠い未来のコンサートから表示されます"
        },
        {
          element: '#introjs-step4',
          intro: "'Plan'ボタンを押すと、各コンサートのコンフリクトが確認できるようになります！<br>他の気になるコンサートと被ってしまわないか、チェックしてね◟̽◞̽*"
        },
        {
          element: '#introjs-step5',
          intro: "ここではアーティストに関するニュースを見つけ次第お伝えしています！"
        },
        {
          element: '#introjs-step6',
          intro: "（会場や都市の情報がわからないとき、ここに住所や会場名を入れると場所情報が出るよ）"
        },
        {
          element: '#introjs-step7',
          intro: "チュートリアルはここのボタンから見れるよ！"
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
          intro: "こんにちは！ご訪問ありがとう♡<br>トップページの使い方を紹介します◡̈"
        },
        {
          // ELEMENT: CONNECTOR (DIRECT BY SELECTOR)
          element: '#introjs-step1',
          intro: "ここにはピックアップコンサートが流れます。<br>毎度違うコンサートが出るので、大好きなアーティストを見つけてね"
        },
        {
          element: '#introjs-step2',
          intro: "ここには、既に確認済みのコンサート情報が並んでいます。<br>クリックすると詳細に飛べるよ◟̆◞̆♡"
        },
        {
          element: '#introjs-step3',
          intro: "ここで表示のコントロールができます。<br>デフォルトは'Asc'で日付が今日から近い順です。<br>'Desc'を選択すると、一番遠い未来のコンサートから表示されます"
        },
        {
          element: '#introjs-step4',
          intro: "'Plan'ボタンを押すと、各コンサートのコンフリクトが確認できるようになります！<br>他の気になるコンサートと被ってしまわないか、チェックしてね◟̽◞̽*"
        },
        {
          element: '#introjs-step5',
          intro: "ここではアーティストに関するニュースを見つけ次第お伝えしています！"
        },
        // {
        //   element: '#introjs-step6',
        //   intro: "（会場や都市の情報がわからないとき、ここに住所や会場名を入れると場所情報が出るよ）"
        // },
        // {
        //   element: '#introjs-step7',
        //   intro: "チュートリアルはここのボタンから見れるよ！"
        // },
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
  tutorial();
});


$(function(){
  if (Cookies.get('SampleFlg') != 'on') {
    tutorial();
  }
});
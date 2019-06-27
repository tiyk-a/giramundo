// REFERENCE: https://qiita.com/3isawa/items/91fd5209e636e8956628

function tutorial(){
  introJs().setOptions({
      'nextLabel': '>>',
      'prevLabel': '<<',
      'skipLabel': 'Skip',
      'doneLabel': 'x',
      'exitOnOverlayClick': false,
      'showStepNumbers': false,

      // TUTORIAL STEPS
      steps: [
        {
          // INTRO: WHAT TO SHOW
          // STEP 0
          intro: "<b>Hey! I'll guide how to use this site :)</b><br>I guess you are new here"
        },
        {
          // ELEMENT: CONNECTOR (DIRECT BY SELECTOR)
          element: '#introjs-step1',
          intro: "this is the 1st step"
        },
        {
          element: '#introjs-step2',
          intro: "and this is the 2nd step"
        },
        {
          element: '#introjs-step3',
          intro: "then finally this is the last, 3rd step. I'll add steps if it's required"
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

$(function(){
  // $.cookieでCookieを読み込む
  // `SampleFlg`というデータがonであれば、チュートリアルを呼び出す
  if (Cookies.get('SampleFlg') != 'on') {
    tutorial();
  }
});
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>MRI Secure™ — Advisor Tool</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Hanken+Grotesk:wght@400;500;600;700&family=Source+Serif+4:wght@500;600;700&display=swap" rel="stylesheet">
<style>
  :root{
    --navy:#0f3a5c; --navy-dark:#0a2236; --blue:#2e69a3; --blue-dark:#1d4d79; --blue-light:#7fc0e8;
    --cream:#f7f5f0; --card:#ffffff; --card-alt:#faf8f4; --border:#eae5db;
    --ink:#16242e; --muted:#5a6872; --muted2:#7a8893; --gold:#b07a3c; --star:#f5c453;
    --good:#2e8b57; --warn:#b3541e;
  }
  *{box-sizing:border-box;margin:0;padding:0}
  body{font-family:'Hanken Grotesk',system-ui,sans-serif;background:var(--cream);color:var(--ink);line-height:1.55}
  h1,h2,h3{font-family:'Source Serif 4',serif;color:var(--navy);letter-spacing:-.2px}
  a{color:inherit}
  header.topbar{position:sticky;top:0;z-index:50;background:rgba(247,245,240,.92);backdrop-filter:blur(10px);border-bottom:1px solid var(--border)}
  .topbar-inner{width:100%;padding:16px 24px;display:flex;align-items:center;justify-content:flex-start;gap:14px}
  .mri-logo{height:32px;width:auto;color:var(--blue);flex:none;display:block}
  .logo-divider{width:1px;height:30px;background:rgba(46,105,163,.25);flex:none}
  .logo-text{display:flex;flex-direction:column;line-height:1.15;white-space:nowrap}
  .logo-text b{font-family:'Source Serif 4',serif;font-size:16px;color:var(--blue)}
  .logo-text span{font-size:11px;color:var(--muted2);font-weight:500}
  .progress-wrap{width:100%;padding:0 24px 14px}
  .progress-track{display:flex;gap:6px}
  .progress-step{flex:1;height:5px;border-radius:3px;background:#e2ddd0}
  .progress-step.done{background:var(--blue)}
  .progress-step.current{background:var(--blue-light)}
  .progress-labels{display:flex;justify-content:space-between;margin-top:6px;font-size:10.5px;color:var(--muted2);font-weight:600;letter-spacing:.3px;text-transform:uppercase}
  .progress-current-mobile{display:none;margin-top:6px;font-size:11px;color:var(--muted2);font-weight:600}
  main{max-width:820px;margin:0 auto;padding:36px 24px 90px}
  .screen{display:none;animation:fadeIn .35s ease}
  .screen.active{display:block}
  @keyframes fadeIn{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:translateY(0)}}
  .eyebrow{font-size:12px;font-weight:700;letter-spacing:1.6px;text-transform:uppercase;color:var(--gold);margin-bottom:10px}
  .card{background:var(--card);border:1px solid var(--border);border-radius:16px;padding:28px 30px;margin-bottom:20px;box-shadow:0 1px 3px rgba(15,58,92,.04)}
  .card h2{font-size:24px;margin-bottom:10px}
  .card p.lead{color:var(--muted);font-size:15px;margin-bottom:18px}
  .group-title{font-size:13px;font-weight:700;text-transform:uppercase;letter-spacing:1px;color:var(--blue);margin:22px 0 12px}
  .group-title:first-child{margin-top:0}
  .steps-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:16px;margin:18px 0 22px}
  .step-card{background:var(--card-alt);border:1px solid var(--border);border-radius:12px;padding:18px 20px}
  .step-card .step-num{font-family:'Source Serif 4',serif;font-weight:700;font-size:12px;color:var(--blue);letter-spacing:1px;margin-bottom:8px}
  .step-card h3{font-size:16px;margin-bottom:6px}
  .step-card p{font-size:13.5px;color:var(--muted);line-height:1.55}
  .q-row{padding:14px 0;border-bottom:1px solid var(--border)}
  .q-row:last-child{border-bottom:none}
  .q-text{font-size:15px;font-weight:500;margin-bottom:8px}
  select, input[type=text], input[type=email], input[type=number]{
    width:100%;padding:11px 13px;border:1px solid #d7d1c2;border-radius:9px;font-size:14.5px;font-family:inherit;background:#fff;color:var(--ink)
  }
  select:focus, input:focus{outline:2px solid var(--blue-light);outline-offset:1px}
  .asset-row{display:grid;grid-template-columns:1fr 160px 60px;gap:12px;align-items:center;padding:10px 0;border-bottom:1px solid var(--border)}
  .asset-row:last-child{border-bottom:none}
  .asset-label{font-size:14px;font-weight:500}
  .asset-pct{font-size:12px;color:var(--muted2);text-align:right}
  .dollar-input{position:relative}
  .dollar-input span{position:absolute;left:12px;top:50%;transform:translateY(-50%);color:var(--muted2);font-size:14px}
  .dollar-input input{padding-left:24px}
  .total-bar{display:flex;justify-content:space-between;align-items:center;background:var(--navy);color:#fff;border-radius:12px;padding:16px 20px;margin-top:6px;position:sticky;bottom:14px;box-shadow:0 10px 30px rgba(15,58,92,.25)}
  .total-bar b{font-family:'Source Serif 4',serif;font-size:22px}
  .btn-row{display:flex;gap:12px;margin-top:22px;flex-wrap:wrap}
  .btn{border:none;cursor:pointer;font-weight:600;font-size:14.5px;padding:13px 26px;border-radius:9px;font-family:inherit;transition:transform .08s ease}
  .btn:active{transform:scale(.98)}
  .btn-primary{background:var(--blue);color:#fff;box-shadow:0 4px 14px rgba(46,105,163,.28)}
  .btn-primary:hover{background:var(--blue-dark)}
  .btn-secondary{background:#fff;color:var(--navy);border:1px solid #cfd8de}
  .btn-secondary:hover{background:#f2f6f9}
  .btn:disabled{opacity:.5;cursor:not-allowed}
  .terms-box{max-height:220px;overflow-y:auto;background:var(--card-alt);border:1px solid var(--border);border-radius:10px;padding:16px 18px;font-size:12.5px;color:var(--muted);margin-bottom:16px}
  .terms-box p{margin-bottom:10px}
  .checkbox-row{display:flex;align-items:flex-start;gap:10px;font-size:13.5px;color:var(--muted)}
  .stat-grid{display:grid;grid-template-columns:1fr 1fr;gap:14px;margin-bottom:20px}
  .stat-card{background:var(--card-alt);border:1px solid var(--border);border-radius:12px;padding:16px 18px}
  .stat-card .k{font-size:11.5px;font-weight:600;color:var(--muted2);text-transform:uppercase;letter-spacing:.5px}
  .stat-card .v{font-family:'Source Serif 4',serif;font-weight:700;font-size:26px;color:var(--navy);margin-top:4px}
  .gauge{margin:22px 0 8px}
  .gauge-track{position:relative;height:8px;border-radius:5px;background:#e6e1d4;margin-bottom:10px}
  .gauge-fill{position:absolute;top:0;left:0;height:100%;border-radius:5px;background:linear-gradient(90deg,#7fc0e8,#2e69a3)}
  .gauge-dot{position:absolute;top:-6px;width:20px;height:20px;border-radius:50%;border:3px solid #fff;box-shadow:0 2px 6px rgba(0,0,0,.25);transform:translateX(-50%)}
  .gauge-legend{display:flex;flex-wrap:wrap;gap:14px;font-size:12px;color:var(--muted);margin-top:4px}
  .legend-dot{display:inline-block;width:10px;height:10px;border-radius:50%;margin-right:5px;vertical-align:middle}
  .feedback-block{background:var(--card-alt);border-left:3px solid var(--blue);border-radius:8px;padding:14px 18px;margin-bottom:12px;font-size:14.5px}
  .feedback-block b{color:var(--navy)}
  .star-rating{font-size:30px;letter-spacing:4px;color:var(--star)}
  .loading-overlay{position:fixed;inset:0;background:rgba(15,58,92,.35);backdrop-filter:blur(2px);display:none;align-items:center;justify-content:center;z-index:100}
  .loading-overlay.active{display:flex}
  .spinner{width:44px;height:44px;border-radius:50%;border:4px solid rgba(255,255,255,.35);border-top-color:#fff;animation:spin .8s linear infinite}
  @keyframes spin{to{transform:rotate(360deg)}}
  .error-banner{background:#fdecea;border:1px solid #f3c2ba;color:#8a2f22;border-radius:10px;padding:12px 16px;font-size:13.5px;margin-bottom:16px;display:none}
  .error-banner.active{display:block}
  .debug-toggle{font-size:12px;color:var(--muted2);text-decoration:underline;cursor:pointer;display:inline-block;margin-top:10px}
  .debug-panel{display:none;background:#0a2236;color:#cfe0ee;border-radius:10px;padding:14px 16px;font-size:11.5px;font-family:ui-monospace,monospace;margin-top:10px;max-height:260px;overflow:auto;white-space:pre-wrap}
  .debug-panel.active{display:block}
  footer{max-width:820px;margin:0 auto;padding:30px 24px 60px;font-size:12px;color:var(--muted2);text-align:center}
  @media(max-width:680px){
    .progress-labels{display:none}
    .progress-current-mobile{display:block}
    .logo-text span{display:none}
    .topbar-inner{padding:12px 16px;gap:10px}
    .progress-wrap{padding:0 16px 12px}
    main{padding:24px 16px 70px}
  }
  @media(max-width:600px){
    .asset-row{grid-template-columns:1fr 110px 40px;gap:8px}
    .asset-pct{font-size:10.5px}
    .stat-grid{grid-template-columns:1fr}
    .steps-grid{grid-template-columns:1fr}
    .card{padding:20px 16px}
    .btn{padding:12px 20px;font-size:14px}
    .total-bar{padding:14px 16px;bottom:10px}
    header .mri-logo{height:26px!important}
  }
  @media(max-width:400px){
    .asset-row{grid-template-columns:1fr 96px 34px}
    .dollar-input input{padding-left:20px;font-size:13.5px}
  }
</style>
</head>
<body>

<svg style="position:absolute;width:0;height:0;overflow:hidden" aria-hidden="true">
  <defs>
    <symbol id="mriLogoMark" viewBox="196.6 176.3 1254.5 495">
      <path fill="currentColor" d="M211.6,331.6V191.5c0-0.1,0.1-0.2,0.2-0.2h161.6c0.1,0,0.2,0.1,0.2,0.2l54.1,140.1c0.1,0.2-0.1,0.3-0.2,0.3H211.9C211.7,331.9,211.6,331.8,211.6,331.6z"/>
      <path fill="currentColor" d="M774.1,191.6v139.9c0,0.2-0.2,0.4-0.4,0.4H560.1c-0.3,0-0.4-0.3-0.3-0.5l52.9-139.9c0.1-0.1,0.2-0.2,0.3-0.2h160.8C773.9,191.3,774.1,191.4,774.1,191.6z"/>
      <path fill="currentColor" d="M1240.8,331.5c0,0.2-0.1,0.3-0.3,0.3h-138.6c-0.2,0-0.4-0.1-0.5-0.3c-3.7-8.9-9.7-15.8-18-20.7c-7.1-4.2-15.6-6.3-24.1-7c-2.8-0.3-7.1-0.4-12.8-0.4l-61.8,0c-0.1,0-0.2,0.1-0.2,0.2v28.1c0,0.1-0.1,0.1-0.1,0.1H850.8c-0.2,0-0.3-0.1-0.3-0.3V191.6c0-0.2,0.1-0.3,0.3-0.3c1.8-0.1,3.9-0.1,6.3-0.1c15.7,0,218.7,0.2,224.7,0.6c18.7,1.3,37,4.3,54.9,10c14.3,4.6,27.8,11.1,40.6,19.4c24.9,16.3,42.8,38.4,53.7,66.2C1236.4,301.6,1239.7,316.3,1240.8,331.5z"/>
      <path fill="currentColor" d="M1436.1,331.6c0,0.2-0.1,0.3-0.3,0.3h-133.4c-0.2,0-0.3-0.1-0.3-0.3v-140c0-0.2,0.1-0.3,0.3-0.3h133.4c0.2,0,0.3,0.1,0.3,0.3V331.6z"/>
      <path fill="currentColor" d="M490.6,494C490.6,494.1,490.6,494.1,490.6,494l-114.5,0.1c-0.1,0-0.2-0.1-0.3-0.2l-30.1-88.2c0,0,0,0-0.1,0c0,0,0,0,0,0.1v88c0,0.2-0.1,0.3-0.3,0.3H211.8c-0.1,0-0.1-0.1-0.1-0.1V353.7c0-0.1,0.1-0.1,0.1-0.1h224.3c0.2,0,0.4,0.1,0.4,0.3L490.6,494z"/>
      <path fill="currentColor" d="M498.4,494.1c0,0,0-0.1-0.1-0.1l53-140.2c0-0.1,0.2-0.2,0.3-0.2h222.2c0.1,0,0.3,0.1,0.3,0.3v140c0,0.1-0.1,0.2-0.2,0.2H640.2c-0.1,0-0.2-0.1-0.2-0.2v-86.2c0,0,0-0.1-0.1-0.1c0,0-0.1,0-0.1,0L610.5,494c0,0.1-0.1,0.1-0.2,0.1H498.4z"/>
      <path fill="currentColor" d="M850.7,353.6h133.4c0.2,0,0.3,0.1,0.3,0.3v49.6c0,0.1,0.1,0.1,0.1,0.1c35.8,0,59.1,0,69.8,0c4.3,0,9-0.6,14.1-1.6c5.1-1,9.6-2.5,13.4-4.4c15.9-8,22.7-23.2,23.4-40.5c0-0.9,0.1-2,0.1-3.3c0-0.1,0.1-0.2,0.2-0.2H1241c0.1,0,0.2,0.1,0.2,0.2c-1.4,31.9-12.6,62.4-33.4,86.6c-8.8,10.2-19,19-30.7,26.2c-13,8-26.8,14.2-41.4,18.4c-0.2,0.1-0.2,0.2-0.2,0.4l4.9,8.5c0,0.1,0,0.2-0.1,0.2H850.8c-0.2,0-0.3-0.2-0.3-0.3V353.9C850.5,353.7,850.6,353.6,850.7,353.6z"/>
      <path fill="currentColor" d="M1436.1,493.8c0,0.2-0.1,0.3-0.3,0.3h-133.4c-0.2,0-0.3-0.1-0.3-0.3V353.9c0-0.2,0.1-0.3,0.3-0.3h133.4c0.2,0,0.3,0.1,0.3,0.3V493.8z"/>
      <path fill="currentColor" d="M345.7,656.2c0,0.1-0.1,0.2-0.2,0.2H211.9c-0.1,0-0.2-0.1-0.2-0.2V516c0-0.1,0.1-0.2,0.2-0.2h133.5c0.1,0,0.2,0.1,0.2,0.2V656.2z"/>
      <path fill="currentColor" d="M602.9,516L555,656.3c0,0.1-0.1,0.1-0.2,0.1H431.5c-0.1,0-0.1,0-0.2-0.1L383.5,516c0-0.1,0-0.2,0.2-0.2h219.1C602.8,515.8,602.9,515.9,602.9,516z"/>
      <path fill="currentColor" d="M774,656.2c0,0.1-0.1,0.3-0.3,0.3H640.3c-0.1,0-0.3-0.1-0.3-0.3V516c0-0.1,0.1-0.3,0.3-0.3h133.4c0.1,0,0.3,0.1,0.3,0.3V656.2z"/>
      <path fill="currentColor" d="M984.4,656.2c0,0.1-0.1,0.2-0.2,0.2H850.7c-0.1,0-0.2-0.1-0.2-0.2V516c0-0.1,0.1-0.2,0.2-0.2h133.6c0.1,0,0.2,0.1,0.2,0.2V656.2z"/>
      <path fill="currentColor" d="M1009.9,515.8h143.3c0,0,0.1,0,0.1,0.1l81.1,140.4c0.1,0.1,0,0.2-0.1,0.2h-148.7c-0.1,0-0.1,0-0.1-0.1L1009.7,516C1009.7,515.9,1009.8,515.8,1009.9,515.8z"/>
      <path fill="currentColor" d="M1436.1,656.3c0,0.1-0.1,0.2-0.2,0.2h-133.6c-0.1,0-0.2-0.1-0.2-0.2V515.9c0-0.1,0.1-0.2,0.2-0.2h133.6c0.1,0,0.2,0.1,0.2,0.2V656.3z"/>
    </symbol>
  </defs>
</svg>

<header class="topbar">
  <div class="topbar-inner">
    <svg class="mri-logo" style="height:32px"><use href="#mriLogoMark"></use></svg>
    <span class="logo-divider"></span>
    <div class="logo-text"><b>MRI Secure™</b><span>Annuity Fit &amp; Portfolio Insights</span></div>
  </div>
  <div class="progress-wrap">
    <div class="progress-track" id="progressTrack"></div>
    <div class="progress-labels">
      <span>Welcome</span><span>Risk Profile</span><span>Portfolio</span><span>Report</span><span>Sandbox</span><span>Annuity Fit</span>
    </div>
    <div class="progress-current-mobile" id="progressCurrentMobile"></div>
  </div>
</header>

<main>

  <!-- SCREEN 0: INTRO / TERMS -->
  <section class="screen active" id="screen-0">
    <div class="eyebrow">Client Comfort with Risk &amp; Annuity Fit</div>
    <div class="card">
      <svg class="mri-logo" style="height:52px;margin-bottom:16px"><use href="#mriLogoMark"></use></svg>
      <h2>Welcome to the MRI Secure™ Portfolio Risk Estimator</h2>
      <p class="lead">This tool measures a client's comfort with risk, scores their current portfolio, and shows the impact of reallocating toward fixed and fixed-indexed annuities — live, in the room with an advisor.</p>

      <div class="group-title">How It Works</div>
      <p style="font-size:14px;color:var(--muted);margin-bottom:0">From a 10-question survey to a defensible recommendation.</p>
      <div class="steps-grid">
        <div class="step-card">
          <div class="step-num">STEP ONE</div>
          <h3>Client takes the assessment</h3>
          <p>10 questions on a six-point agreement scale estimate a comfort-with-risk and annuity score, sent straight to the advisor.</p>
        </div>
        <div class="step-card">
          <div class="step-num">STEP TWO</div>
          <h3>Advisor reallocates in the sandbox</h3>
          <p>Enter required rate of return and current holdings across 26 asset types, then interactively add fixed and fixed-indexed annuities to see the effect.</p>
        </div>
        <div class="step-card">
          <div class="step-num">STEP THREE</div>
          <h3>Report makes the case</h3>
          <p>A concise report compares current vs. reallocated risk and potential loss, and rates the client's fit for fixed/immediate annuities.</p>
        </div>
      </div>

      <div class="group-title">Before You Begin</div>
      <p style="font-size:14px;color:var(--muted);margin-bottom:16px">Gather investment statements, think in terms of total household holdings (not one account), skip any category with no holdings, and exclude home or business assets. Have the client's target rate of return on hand if known.</p>

      <div class="terms-box">
        <p><b>Terms of Use.</b> The developers of MRI™ do not provide financial planning, investment, legal, accounting, retirement, portfolio management, or other professional advisory services. All content, including assessments, typologies, tools, and reports, is intended solely for informational purposes and does not constitute personalized investment advice or an offer to buy or sell any security.</p>
        <p>Users are solely responsible for evaluating and applying this information in light of their own risk preferences, financial knowledge, and goals. MRI™ outputs are general frameworks, not a sole basis for investment decisions, and do not explicitly incorporate a user's complete financial profile, time horizon, or market outlook.</p>
        <p>All outputs are intended to support further evaluation and discussion with a qualified financial advisor. Users should seek independent financial, legal, or other professional advice before acting on any MRI™ output.</p>
        <p>By using this tool you acknowledge that anonymized, aggregated input data may be used for research and development. All services are provided "as is," without warranty, and use is at your own risk.</p>
      </div>
      <label class="checkbox-row">
        <input type="checkbox" id="agreeTerms" style="margin-top:2px">
        <span>I have read and agree to the Terms of Use above.</span>
      </label>
      <div class="btn-row">
        <button class="btn btn-primary" id="btnStart" disabled onclick="goTo(1)">Agree &amp; Begin the Analysis</button>
      </div>
    </div>
  </section>

  <!-- SCREEN 1: RISK ASSESSMENT -->
  <section class="screen" id="screen-1">
    <div class="eyebrow">Step 1 of 5</div>
    <div class="card">
      <h2>Let's Get to Know You Before We Dive In</h2>
      <p class="lead">There are no right or wrong answers — just be honest and thoughtful. This helps us understand your comfort with risk.</p>

      <div class="q-row">
        <div class="q-text">For registration purposes, please provide an email:</div>
        <input type="email" id="in_ContactInformation" placeholder="client@email.com">
      </div>

      <div id="riskQuestions"></div>

      <div class="q-row">
        <div class="q-text">When thinking about your investment goals, what is your target rate of return (%)?</div>
        <input type="number" id="in_TargetReturn" placeholder="e.g. 6" step="0.1">
      </div>

      <div class="btn-row">
        <button class="btn btn-secondary" onclick="goTo(0)">Back</button>
        <button class="btn btn-primary" onclick="validateAndGo(1,2)">Continue to Portfolio</button>
      </div>
    </div>
  </section>

  <!-- SCREEN 2: PORTFOLIO INPUT -->
  <section class="screen" id="screen-2">
    <div class="eyebrow">Step 2 of 5</div>
    <div class="card">
      <h2>Enter Your Portfolio Holdings</h2>
      <p class="lead">Enter dollar amounts held in each category. Skip anything you don't hold — no need to enter $0.</p>
      <div id="assetGroups"></div>
      <div class="total-bar">
        <span>Total Portfolio Value</span>
        <b id="portfolioTotalDisplay">$0</b>
      </div>
      <div class="btn-row">
        <button class="btn btn-secondary" onclick="goTo(1)">Back</button>
        <button class="btn btn-primary" id="btnCalculate" onclick="submitPortfolio()">Calculate My Results</button>
      </div>
      <div class="error-banner" id="errorBanner2"></div>
    </div>
  </section>

  <!-- SCREEN 3: REPORT -->
  <section class="screen" id="screen-3">
    <div class="eyebrow">Step 3 of 5</div>
    <div class="card">
      <h2>Your Portfolio Report</h2>
      <div class="stat-grid">
        <div class="stat-card"><div class="k">MRI Comfort with Risk</div><div class="v" id="out_comfort">—</div></div>
        <div class="stat-card"><div class="k">Current Portfolio Risk</div><div class="v" id="out_portfolioScore">—</div></div>
      </div>
      <div class="gauge">
        <div class="gauge-track" id="gaugeTrackReport"></div>
        <div class="gauge-legend">
          <span><i class="legend-dot" style="background:#7fc0e8"></i>Comfort with Risk</span>
          <span><i class="legend-dot" style="background:#0f3a5c"></i>Current Portfolio</span>
        </div>
        <p style="font-size:11.5px;color:var(--muted2);margin-top:4px">Scale runs from 5 (very low risk) to 95 (very high risk).</p>
      </div>
      <div class="feedback-block"><b>Advisor Classification:</b> <span id="out_advisorCat">—</span> &nbsp;|&nbsp; <b>Portfolio Classification:</b> <span id="out_portfolioCat">—</span></div>
      <div class="feedback-block"><b>MRI Secure Feedback:</b> <span id="out_feedback">—</span></div>
      <div class="feedback-block"><b>Something to Consider:</b> <span id="out_action">—</span></div>
      <div class="feedback-block"><b>About Your Target Return:</b> <span id="out_returnFeedback">—</span></div>
      <div class="feedback-block" style="border-left-color:var(--warn)"><b>Potential Annual Loss (VAR):</b> <span id="out_var">—</span> — in any given year, this portfolio could lose roughly this much.</div>
      <div class="btn-row">
        <button class="btn btn-secondary" onclick="goTo(2)">Back to Portfolio</button>
        <button class="btn btn-primary" onclick="goTo(4)">Explore the Sandbox</button>
      </div>
    </div>
  </section>

  <!-- SCREEN 4: SANDBOX -->
  <section class="screen" id="screen-4">
    <div class="eyebrow">Step 4 of 5</div>
    <div class="card">
      <h2>The MRI Secure Sandbox</h2>
      <p class="lead">Experiment with reallocating holdings — nothing here changes the client's real portfolio. Try shifting a portion into fixed or fixed-indexed annuities and watch the risk score move toward the Comfort with Risk line.</p>
      <div id="sandboxAssets"></div>
      <div class="total-bar">
        <span>Sandbox Total (must match original)</span>
        <b id="sandboxTotalDisplay">$0</b>
      </div>
      <div class="btn-row">
        <button class="btn btn-primary" id="btnRecalc" onclick="submitSandbox()">Recalculate Sandbox</button>
        <button class="btn btn-secondary" onclick="resetSandboxToOriginal()">Reset to Original</button>
      </div>
      <div class="error-banner" id="errorBanner4"></div>

      <div id="sandboxResults" style="display:none;margin-top:24px;border-top:1px solid var(--border);padding-top:20px">
        <div class="stat-grid">
          <div class="stat-card"><div class="k">Comfort with Risk</div><div class="v" id="out_sandComfort">—</div></div>
          <div class="stat-card"><div class="k">Sandbox Portfolio Risk</div><div class="v" id="out_sandScore">—</div></div>
        </div>
        <div class="gauge">
          <div class="gauge-track" id="gaugeTrackSandbox"></div>
          <div class="gauge-legend">
            <span><i class="legend-dot" style="background:#7fc0e8"></i>Comfort with Risk</span>
            <span><i class="legend-dot" style="background:#0f3a5c"></i>Original Portfolio</span>
            <span><i class="legend-dot" style="background:#2e8b57"></i>Sandbox Portfolio</span>
          </div>
        </div>
        <div class="feedback-block"><b>Sandbox Classification:</b> <span id="out_sandCat">—</span></div>
        <div class="feedback-block"><b>MRI Secure Feedback:</b> <span id="out_sandFeedback">—</span></div>
        <div class="feedback-block"><b>Chance of Losing Money:</b> <span id="out_sandProbLose">—</span> &nbsp;|&nbsp; <b>Chance of Positive Return:</b> <span id="out_sandProbMake">—</span></div>
        <div class="feedback-block"><b>Additional Insight:</b> <span id="out_sandAction">—</span></div>
        <div class="feedback-block"><b>On Target Return:</b> <span id="out_sandReturnFeedback">—</span></div>
        <div class="feedback-block" id="warningBlock" style="display:none;border-left-color:var(--warn)"><b>Note:</b> <span id="out_warning">—</span></div>
      </div>

      <div class="btn-row">
        <button class="btn btn-secondary" onclick="goTo(3)">Back to Report</button>
        <button class="btn btn-primary" onclick="goTo(5)">See Annuity Fit</button>
      </div>
    </div>
  </section>

  <!-- SCREEN 5: ANNUITY SCORE -->
  <section class="screen" id="screen-5">
    <div class="eyebrow">Step 5 of 5</div>
    <div class="card">
      <h2>💡 Your Annuity Score: What It Means</h2>
      <p class="lead">Reflects how well a fixed annuity might fit this client's financial mindset and investment strategy — a conversation starter, not a conclusion.</p>
      <div style="text-align:center;padding:18px 0">
        <div class="star-rating" id="out_annuityStars">☆☆☆☆☆</div>
        <div style="font-size:13px;color:var(--muted2);margin-top:6px" id="out_annuityRaw"></div>
      </div>
      <div class="feedback-block"><b>What This Means:</b> <span id="out_annuityFeedback">—</span></div>

      <div class="group-title">Connect with a Licensed Professional</div>
      <p style="font-size:13px;color:var(--muted);margin-bottom:10px">By submitting, the client authorizes MRI Secure and participating financial professionals to contact them about this inquiry (calls, texts, or automated messages may apply). See Terms of Use.</p>
      <input type="email" id="in_AnnuityContact" placeholder="client@email.com" style="margin-bottom:14px">
      <div class="btn-row">
        <button class="btn btn-secondary" onclick="goTo(4)">Back to Sandbox</button>
        <button class="btn btn-primary" onclick="submitLead()">Submit &amp; Finish</button>
        <button class="btn btn-secondary" onclick="restartAll()">Begin Again</button>
      </div>
      <div class="error-banner" id="errorBanner5"></div>
    </div>
  </section>

  <span class="debug-toggle" onclick="toggleDebug()">Show API debug log</span>
  <div class="debug-panel" id="debugPanel"></div>

</main>

<footer>
  <svg class="mri-logo" style="height:20px;margin:0 auto 10px"><use href="#mriLogoMark"></use></svg>
  © 2026 Money and Risk Inventory, LLC. For advisor use with clients. Not a substitute for individualized financial, legal, or tax advice.
</footer>

<div class="loading-overlay" id="loadingOverlay"><div class="spinner"></div></div>

<script>
/* ============================================================
   CONFIGURATION — SpreadsheetWeb Hub connection
   ============================================================ */
const CONFIG = {
  apiEndpoint: 'https://mriai-coral.vercel.app/api/calculate',
  applicationId: '4dd712a6-09df-471b-ae28-7a9392009851',
  workspaceId: 'd6961a34-9f47-4dfd-adeb-8ac7bd0ed0d8',

  // ⚠️ VERIFY: these must match the literal dropdown option text stored in the
  // workbook at OptimriskPortfolioRisk!$C$1:$C$6 (6-point agreement scale).
  // If scores come back blank/zero, open that range in Excel/Hub and correct
  // these strings to match exactly (including capitalization).
  agreementOptions: ['Strongly Disagree', 'Disagree', 'Somewhat Disagree', 'Somewhat Agree', 'Agree', 'Strongly Agree'],

  // ⚠️ VERIFY against OptimriskPortfolioRisk!$C$8:$C$9
  yesNoOptions: ['Yes', 'No']
};

/* ============================================================
   FIELD SCHEMA — derived from the workbook's Used Named Ranges
   ============================================================ */
const RISK_QUESTIONS = [
  { key: 'Risk1',        text: "I'm okay with taking chances when making investment decisions.", type: 'agree' },
  { key: 'Risk2',        text: "Even if the market goes down a lot, I think I'll be okay financially.", type: 'agree' },
  { key: 'MoneyVigilant', text: "Money should be saved not spent.", type: 'agree' },
  { key: 'Risk3',        text: "I like keeping my money secure instead of investing it because it feels safer to me.", type: 'agree' },
  { key: 'Risk4',        text: "I'm okay with losing money now if I might get more later.", type: 'agree' },
  { key: 'Trauma',       text: "Have you or your family ever experienced a significant financial loss?", type: 'yesno' },
  { key: 'Risk5',        text: "I know how money is made and lost in the markets.", type: 'agree' },
  { key: 'Risk6',        text: "During the last market downturn, I got nervous and sold some of my investments.", type: 'agree' },
  { key: 'Control',      text: "I have control over my financial situation.", type: 'agree' },
  { key: 'Risk7',        text: "I have lots of experience with investing.", type: 'agree' }
];

const ASSETS = [
  { key: 'SavingsAccounts',                sandKey: 'SandSavings',              label: 'Savings Accounts', group: 'cash' },
  { key: 'CheckingAccounts',                sandKey: 'SandChecking',             label: 'Checking Accounts', group: 'cash' },
  { key: 'MoneyMarketAccounts',             sandKey: 'SandMM',                   label: 'Money Market Accounts', group: 'cash' },
  { key: 'CD',                              sandKey: 'SandCD',                   label: 'Certificates of Deposit (CDs)', group: 'cash' },
  { key: 'SavingsBonds',                    sandKey: 'SandSavingsbonds',         label: 'Savings Bonds', group: 'cash' },
  { key: 'TBills',                          sandKey: 'SandTbills',               label: 'T-Bills (mature ≤ 1 year)', group: 'cash' },
  { key: 'FixedAnnuities',                  sandKey: 'SandFixedAnnuities',       label: 'Fixed Annuities', group: 'cash' },
  { key: 'FixedIndexedAnnuities',           sandKey: 'SandFixedIndexedAnnuities',label: 'Fixed Indexed Annuities', group: 'cash' },
  { key: 'CVofLifeInsurance',               sandKey: 'SandCVLifeIns',            label: 'Cash Value of Life Insurance', group: 'cash' },
  { key: 'CVofIndexedLifeInsurance',        sandKey: 'CFIndexedLifeIns',         label: 'Cash Value of Indexed Life Insurance', group: 'cash' },
  { key: 'LumpSumPortfolios',               sandKey: 'SandPensions',             label: 'Lump Sum of Pensions', group: 'cash' },
  { key: 'OtherCash',                       sandKey: 'SandOtherCash',            label: 'Other Cash Equivalent Assets', group: 'cash' },
  { key: 'FIFunds',                         sandKey: 'SandFIFunds',              label: 'Short-Term Bonds & Bond Funds (1–3 yrs)', group: 'bond' },
  { key: 'IntermediateBonds',               sandKey: 'SandIntBonds',             label: 'Intermediate-Term Bonds & Bond Funds (3–7 yrs)', group: 'bond' },
  { key: 'LongBonds',                       sandKey: 'SandLTBonds',              label: 'Long-Term Bonds & Bond Funds (7+ yrs)', group: 'bond' },
  { key: 'StocksFunds',                     sandKey: 'SandStockFunds',           label: 'Stock Mutual Funds & ETFs', group: 'growth' },
  { key: 'GrowthStocks',                    sandKey: 'SandStocks',               label: 'Individual Stocks', group: 'growth' },
  { key: 'ValueStocks',                     sandKey: 'SandTargetdateretirement', label: '"Target Date" / Indexed Retirement Funds', group: 'growth' },
  { key: 'REIT',                            sandKey: 'SandREIT',                 label: 'Real Estate Investments', group: 'growth' },
  { key: 'AlternativeInvestments',          sandKey: 'SandAltInv',               label: 'Alternative Investments', group: 'growth' },
  { key: 'PrivatePlacements',               sandKey: 'SandPrivatePlacements',    label: 'Private Placements', group: 'growth' },
  { key: 'VariableAnnuities',               sandKey: 'SandVariableAnnuities',    label: 'Variable Annuities', group: 'growth' },
  { key: 'VariableLifeInsurance',           sandKey: 'SandVariableLifeIns',      label: 'Variable Life Insurance', group: 'growth' },
  { key: 'VariableUniversalLifeInsurance',  sandKey: 'SandVUL',                  label: 'Variable Universal Life Insurance', group: 'growth' },
  { key: 'Cryptocurrencies',                sandKey: 'SandCrypto',               label: 'Cryptocurrencies', group: 'growth' },
  { key: 'OtherGrowthAssets',                sandKey: 'SandOtherGrowth',          label: 'Other Growth Assets, Gold & Commodities', group: 'growth' }
];

const GROUP_LABELS = { cash: 'Cash & Cash Equivalents', bond: 'Bonds & Bond Funds', growth: 'Growth & Other Assets' };
const REPORT_OUTPUTS = ['PortfolioScore','MRICOMFORTWITHRISKSCORE','MRIRiskCatehgory','CurrentPortfolioCategory','Feedback','Action','ReturnFeedback','VAR','PorrtfolioValue'];
const SANDBOX_OUTPUTS = ['SandPortfolioScore','SandPortfolioCategory','SandFeedback','SandProbLosingMoney','SandProbMakingMoney','SandAction','SandReturnFeedback','Balance','Warning','MRICOMFORTWITHRISKSCORE'];
const ANNUITY_OUTPUTS = ['AnnuityRating','AnnuityFeedback'];

/* ============================================================
   STATE
   ============================================================ */
const state = { inputs: {}, report: {}, sandboxInputs: {}, sandbox: {}, annuity: {} };

/* ============================================================
   NAVIGATION
   ============================================================ */
const SCREEN_COUNT = 6;
const SCREEN_NAMES = ['Welcome','Risk Profile','Portfolio','Report','Sandbox','Annuity Fit'];
function renderProgress(active){
  const track = document.getElementById('progressTrack');
  track.innerHTML = '';
  for(let i=0;i<SCREEN_COUNT;i++){
    const d = document.createElement('div');
    d.className = 'progress-step' + (i<active?' done':(i===active?' current':''));
    track.appendChild(d);
  }
  const mobileLabel = document.getElementById('progressCurrentMobile');
  if(mobileLabel) mobileLabel.textContent = 'Step ' + (active+1) + ' of ' + SCREEN_COUNT + ' — ' + (SCREEN_NAMES[active] || '');
}
function goTo(n){
  document.querySelectorAll('.screen').forEach(s=>s.classList.remove('active'));
  document.getElementById('screen-'+n).classList.add('active');
  renderProgress(n);
  window.scrollTo({top:0,behavior:'smooth'});
}
function validateAndGo(from,to){
  if(from===1){
    for(const q of RISK_QUESTIONS){
      const el = document.getElementById('rq_'+q.key);
      if(!el.value){ alert('Please answer every question before continuing.'); return; }
    }
  }
  goTo(to);
}
function restartAll(){ if(confirm('Start a new client assessment? This clears all current answers.')) location.reload(); }

document.getElementById('agreeTerms').addEventListener('change', function(){
  document.getElementById('btnStart').disabled = !this.checked;
});

/* ============================================================
   BUILD RISK QUESTIONS UI
   ============================================================ */
(function buildRiskQuestions(){
  const wrap = document.getElementById('riskQuestions');
  RISK_QUESTIONS.forEach(q=>{
    const opts = q.type==='yesno' ? CONFIG.yesNoOptions : CONFIG.agreementOptions;
    const row = document.createElement('div');
    row.className = 'q-row';
    row.innerHTML = `<div class="q-text">${q.text}</div>
      <select id="rq_${q.key}"><option value="">Select...</option>${opts.map(o=>`<option value="${o}">${o}</option>`).join('')}</select>`;
    wrap.appendChild(row);
  });
})();

/* ============================================================
   BUILD ASSET INPUT GROUPS (original portfolio)
   ============================================================ */
(function buildAssetGroups(){
  const wrap = document.getElementById('assetGroups');
  ['cash','bond','growth'].forEach(g=>{
    const title = document.createElement('div');
    title.className = 'group-title';
    title.textContent = GROUP_LABELS[g];
    wrap.appendChild(title);
    ASSETS.filter(a=>a.group===g).forEach(a=>{
      const row = document.createElement('div');
      row.className = 'asset-row';
      row.innerHTML = `<div class="asset-label">${a.label}</div>
        <div class="dollar-input"><span>$</span><input type="number" min="0" step="100" id="asset_${a.key}" oninput="updatePortfolioTotal()" placeholder="0"></div>
        <div></div>`;
      wrap.appendChild(row);
    });
  });
})();

function updatePortfolioTotal(){
  let total = 0;
  ASSETS.forEach(a=>{
    const v = parseFloat(document.getElementById('asset_'+a.key).value) || 0;
    total += v;
  });
  document.getElementById('portfolioTotalDisplay').textContent = fmtMoney(total);
  return total;
}

/* ============================================================
   BUILD SANDBOX ASSET UI (mirrors original, editable reallocation)
   ============================================================ */
function buildSandboxAssets(){
  const wrap = document.getElementById('sandboxAssets');
  wrap.innerHTML = '';
  const total = state.originalTotal || 1;
  ['cash','bond','growth'].forEach(g=>{
    const title = document.createElement('div');
    title.className = 'group-title';
    title.textContent = GROUP_LABELS[g];
    wrap.appendChild(title);
    ASSETS.filter(a=>a.group===g).forEach(a=>{
      const orig = state.inputs[a.key] || 0;
      const pct = total ? ((orig/total)*100).toFixed(1) : '0.0';
      const row = document.createElement('div');
      row.className = 'asset-row';
      row.innerHTML = `<div class="asset-label">${a.label}<div style="font-size:11.5px;color:var(--muted2)">Original: ${fmtMoney(orig)} (${pct}%)</div></div>
        <div class="dollar-input"><span>$</span><input type="number" min="0" step="100" id="sand_${a.key}" value="${orig}" oninput="updateSandboxTotal()"></div>
        <div class="asset-pct" id="sandpct_${a.key}">${pct}%</div>`;
      wrap.appendChild(row);
    });
  });
  updateSandboxTotal();
}
function updateSandboxTotal(){
  let total = 0;
  ASSETS.forEach(a=>{
    const v = parseFloat(document.getElementById('sand_'+a.key).value) || 0;
    total += v;
  });
  document.getElementById('sandboxTotalDisplay').textContent = fmtMoney(total);
  ASSETS.forEach(a=>{
    const v = parseFloat(document.getElementById('sand_'+a.key).value) || 0;
    const pctEl = document.getElementById('sandpct_'+a.key);
    if(pctEl) pctEl.textContent = total ? ((v/total)*100).toFixed(1)+'%' : '0.0%';
  });
  return total;
}
function resetSandboxToOriginal(){ buildSandboxAssets(); document.getElementById('sandboxResults').style.display='none'; }

/* ============================================================
   API CALL HELPER
   ============================================================ */
function logDebug(label, obj){
  const panel = document.getElementById('debugPanel');
  const time = new Date().toLocaleTimeString();
  panel.textContent += `\n[${time}] ${label}\n${JSON.stringify(obj,null,2)}\n`;
  panel.scrollTop = panel.scrollHeight;
}
function toggleDebug(){ document.getElementById('debugPanel').classList.toggle('active'); }

async function callSpreadsheetWeb(inputs, outputs){
  const body = { request: { applicationId: CONFIG.applicationId, workspaceId: CONFIG.workspaceId, inputs, outputs } };
  logDebug('REQUEST → ' + CONFIG.apiEndpoint, body);
  const res = await fetch(CONFIG.apiEndpoint, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body)
  });
  const json = await res.json().catch(()=>({}));
  logDebug('RESPONSE (status ' + res.status + ')', json);
  if(!res.ok || json.isError){
    const msg = (json.messages && json.messages.join(', ')) || ('HTTP ' + res.status);
    throw new Error(msg);
  }
  const outs = json.response ? json.response.outputs : (json.outputs || {});
  return caseInsensitiveMap(outs || {});
}
function caseInsensitiveMap(obj){
  const lower = {};
  Object.keys(obj).forEach(k=>{ lower[k.toLowerCase()] = obj[k]; });
  return { get: (name)=> obj[name] !== undefined ? obj[name] : lower[name.toLowerCase()] };
}

function setLoading(on){ document.getElementById('loadingOverlay').classList.toggle('active', !!on); }
function showError(id,msg){ const el=document.getElementById(id); el.textContent = msg; el.classList.add('active'); }
function clearError(id){ const el=document.getElementById(id); el.textContent=''; el.classList.remove('active'); }

/* ============================================================
   STEP: SUBMIT PORTFOLIO → GET REPORT
   ============================================================ */
async function submitPortfolio(){
  clearError('errorBanner2');
  const total = updatePortfolioTotal();
  if(total <= 0){ showError('errorBanner2','Enter at least one portfolio holding before calculating.'); return; }

  const inputs = { ContactInformation: document.getElementById('in_ContactInformation').value || '' };
  RISK_QUESTIONS.forEach(q=>{ inputs[q.key] = document.getElementById('rq_'+q.key).value; });
  inputs['TargetReturn'] = document.getElementById('in_TargetReturn').value || '';
  ASSETS.forEach(a=>{ inputs[a.key] = document.getElementById('asset_'+a.key).value || '0'; });

  state.inputs = {};
  ASSETS.forEach(a=>{ state.inputs[a.key] = parseFloat(inputs[a.key]) || 0; });
  state.originalTotal = total;

  document.getElementById('btnCalculate').disabled = true;
  setLoading(true);
  try{
    const out = await callSpreadsheetWeb(inputs, REPORT_OUTPUTS);
    state.report = out;
    renderReport(out);
    buildSandboxAssets();
    goTo(3);
  }catch(err){
    showError('errorBanner2', 'Calculation failed: ' + err.message + '. Check the debug log below for details.');
  }finally{
    setLoading(false);
    document.getElementById('btnCalculate').disabled = false;
  }
}

function renderReport(out){
  const comfort = num(out.get('MRICOMFORTWITHRISKSCORE'));
  const score = num(out.get('PortfolioScore'));
  document.getElementById('out_comfort').textContent = fmtScore(comfort);
  document.getElementById('out_portfolioScore').textContent = fmtScore(score);
  document.getElementById('out_advisorCat').textContent = renderCategory(out.get('MRIRiskCatehgory'));
  document.getElementById('out_portfolioCat').textContent = renderCategory(out.get('CurrentPortfolioCategory'));
  document.getElementById('out_feedback').textContent = out.get('Feedback') || '—';
  document.getElementById('out_action').textContent = out.get('Action') || '—';
  document.getElementById('out_returnFeedback').textContent = out.get('ReturnFeedback') || '—';
  document.getElementById('out_var').textContent = fmtMoney(num(out.get('VAR')));
  renderGauge('gaugeTrackReport', [
    { value: comfort, color: '#7fc0e8' },
    { value: score, color: '#0f3a5c' }
  ]);
}

/* ============================================================
   STEP: SUBMIT SANDBOX
   ============================================================ */
async function submitSandbox(){
  clearError('errorBanner4');
  const total = updateSandboxTotal();
  if(Math.abs(total - state.originalTotal) > (state.originalTotal*0.02)){
    if(!confirm('Sandbox total ($' + total.toLocaleString() + ') differs from the original portfolio total ($' + state.originalTotal.toLocaleString() + ') by more than 2%. Continue anyway?')) return;
  }
  const inputs = {};
  RISK_QUESTIONS.forEach(q=>{ inputs[q.key] = document.getElementById('rq_'+q.key).value; });
  inputs['TargetReturn'] = document.getElementById('in_TargetReturn').value || '';
  ASSETS.forEach(a=>{
    inputs[a.key] = document.getElementById('asset_'+a.key).value || '0';
    inputs[a.sandKey] = document.getElementById('sand_'+a.key).value || '0';
  });

  document.getElementById('btnRecalc').disabled = true;
  setLoading(true);
  try{
    const out = await callSpreadsheetWeb(inputs, SANDBOX_OUTPUTS);
    state.sandbox = out;
    renderSandbox(out);
  }catch(err){
    showError('errorBanner4', 'Calculation failed: ' + err.message + '. Check the debug log below for details.');
  }finally{
    setLoading(false);
    document.getElementById('btnRecalc').disabled = false;
  }
}
function renderSandbox(out){
  document.getElementById('sandboxResults').style.display='block';
  const comfort = num(out.get('MRICOMFORTWITHRISKSCORE'));
  const sandScore = num(out.get('SandPortfolioScore'));
  const origScore = num(state.report.get ? state.report.get('PortfolioScore') : null);
  document.getElementById('out_sandComfort').textContent = fmtScore(comfort);
  document.getElementById('out_sandScore').textContent = fmtScore(sandScore);
  document.getElementById('out_sandCat').textContent = renderCategory(out.get('SandPortfolioCategory'));
  document.getElementById('out_sandFeedback').textContent = out.get('SandFeedback') || '—';
  document.getElementById('out_sandProbLose').textContent = fmtPct(out.get('SandProbLosingMoney'));
  document.getElementById('out_sandProbMake').textContent = fmtPct(out.get('SandProbMakingMoney'));
  document.getElementById('out_sandAction').textContent = out.get('SandAction') || '—';
  document.getElementById('out_sandReturnFeedback').textContent = out.get('SandReturnFeedback') || '—';
  const warning = out.get('Warning');
  if(warning){ document.getElementById('warningBlock').style.display='block'; document.getElementById('out_warning').textContent = warning; }
  renderGauge('gaugeTrackSandbox', [
    { value: comfort, color: '#7fc0e8' },
    { value: origScore, color: '#0f3a5c' },
    { value: sandScore, color: '#2e8b57' }
  ]);
}

/* ============================================================
   STEP: ANNUITY SCORE (fetched lazily on screen 5)
   ============================================================ */
async function loadAnnuityScore(){
  const inputs = {};
  RISK_QUESTIONS.forEach(q=>{ inputs[q.key] = document.getElementById('rq_'+q.key).value; });
  ASSETS.forEach(a=>{ inputs[a.key] = document.getElementById('asset_'+a.key).value || '0'; });
  setLoading(true);
  try{
    const out = await callSpreadsheetWeb(inputs, ANNUITY_OUTPUTS);
    state.annuity = out;
    const rating = out.get('AnnuityRating');
    const n = Number(rating);
    if(!isNaN(n) && n>=0 && n<=5){
      document.getElementById('out_annuityStars').textContent = '★'.repeat(Math.round(n)) + '☆'.repeat(5-Math.round(n));
      document.getElementById('out_annuityRaw').textContent = n.toFixed(1) + ' / 5';
    } else {
      document.getElementById('out_annuityStars').textContent = rating || '☆☆☆☆☆';
      document.getElementById('out_annuityRaw').textContent = '';
    }
    document.getElementById('out_annuityFeedback').textContent = out.get('AnnuityFeedback') || '—';
  }catch(err){
    showError('errorBanner5', 'Could not load annuity score: ' + err.message);
  }finally{
    setLoading(false);
  }
}
// Trigger annuity load whenever screen 5 becomes visible
const origGoTo = goTo;
goTo = function(n){ origGoTo(n); if(n===5) loadAnnuityScore(); };

async function submitLead(){
  clearError('errorBanner5');
  const email = document.getElementById('in_AnnuityContact').value;
  if(!email){ showError('errorBanner5','Enter an email to connect the client with an advisor.'); return; }
  setLoading(true);
  try{
    await callSpreadsheetWeb({ AnnuityContact: email }, []);
    alert('Thank you — the client has been submitted for advisor follow-up.');
  }catch(err){
    showError('errorBanner5', 'Submission failed: ' + err.message + '. (Note: lead-notification emails may require a separate SpreadsheetWeb Hub automation/Zapier trigger beyond this simple calculation call — verify with your Hub admin.)');
  }finally{
    setLoading(false);
  }
}

/* ============================================================
   FORMATTING / GAUGE HELPERS
   ============================================================ */
function num(v){ const n = parseFloat(v); return isNaN(n) ? 0 : n; }
function fmtMoney(v){ const n = num(v); return '$' + n.toLocaleString(undefined,{maximumFractionDigits:0}); }
function fmtScore(v){ return num(v).toFixed(0); }
function fmtPct(v){ const n = num(v); return n.toFixed(1) + '%'; }
function renderCategory(raw){
  if(raw===undefined || raw===null || raw==='') return '—';
  const n = Number(raw);
  if(!isNaN(n) && Number.isInteger(n) && n>=1 && n<=5){
    const labels = ['Very Conservative','Conservative','Moderate','Growth-Oriented','Aggressive'];
    return labels[n-1];
  }
  return String(raw);
}
function renderGauge(trackId, points){
  const track = document.getElementById(trackId);
  track.innerHTML = '';
  const min=5, max=95;
  points.forEach(p=>{
    const pct = Math.max(0, Math.min(100, ((p.value-min)/(max-min))*100));
    const dot = document.createElement('div');
    dot.className='gauge-dot';
    dot.style.left = pct+'%';
    dot.style.background = p.color;
    track.appendChild(dot);
  });
  const fill = document.createElement('div');
  fill.className='gauge-fill';
  const maxPct = Math.max(...points.map(p=>Math.max(0,Math.min(100,((p.value-min)/(max-min))*100))));
  fill.style.width = maxPct+'%';
  track.insertBefore(fill, track.firstChild);
}

renderProgress(0);
</script>
</body>
</html>

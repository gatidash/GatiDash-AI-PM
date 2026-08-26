const POSTS = {
  "from-parrot-to-colleague": {
    title: "How AI Went From Parrot to Colleague",
    html: `<!-- ===================== HERO ===================== -->
<header class="hero">
  <div class="wrap wide">
    <p class="eyebrow">Field note · Essay</p>
    <h1>How AI Went From Parrot to Colleague</h1>
    <p class="deck">Every buzzword of the last four years, in the order it broke.</p>
    <div class="byline">
      <img class="avatar" src="/profile-avatar.webp" width="48" height="48" loading="lazy" alt="Gatikrishna Dash">
      <div class="who">
        <div class="name">Gatikrishna Dash</div>
        <div class="sub">Aug 2026 · ~12 min read</div>
      </div>
    </div>
  </div>
</header>

<!-- ===================== COVER ===================== -->
<div class="cover-wrap">
  <div class="wrap wide">
    <img class="cover" src="/01-cover.webp" width="2400" height="1600" decoding="async" alt="A dotted trajectory arcs from a &quot;Parrot — it could only talk&quot; node up to a &quot;Colleague — now it can act&quot; node.">
    <p class="cover-cap">First we built machines that could talk. Then machines that could do things.</p>
  </div>
</div>

<!-- ===================== ARTICLE ===================== -->
<article>
  <div class="wrap">
    <p>In November 2022, Meta released an AI model called Galactica. It was trained on millions of science papers and it was meant to help researchers. Three days later Meta pulled it down, because it kept making up research that never existed.</p>

    <p>Two weeks after that, OpenAI released ChatGPT. Same flaw. It made things up too. It hit a hundred million users in two months.</p>

    <p>I still think about that. Same bug, two completely different endings. The only real difference was time. People got a few weeks to fall in love with ChatGPT before they found the problem. Galactica never got those weeks.</p>

    <p>I have watched this from a product seat for the last four years, and I spent most of the years before that in payments and compliance, where a system being confidently wrong is not a funny story. In that world a wrong number is a reconciliation break, a regulator's question, a customer who does not get paid. So I watched this whole thing with one question running in my head the entire time: when would any of this be safe enough to put near money. If you ask me what this whole period was actually about, it is this. Almost every big AI failure since 2022 turned into the next thing that worked. Not in a poetic way. In a boring, literal, engineering way. Somebody got embarrassed in public, and a few months later there was a feature to stop it happening again.</p>

    <p>So here is the story in order, with the buzzwords sitting where they actually showed up. If you have been nodding along in meetings without being fully sure what half these words mean, this one is for you.</p>

    <h2 class="sec">First, the thing inside the box</h2>
    <p>What sat behind that chat window was a <span class="term">large language model</span>. LLM. It is a <span class="term">neural network</span> built on an architecture called a <span class="term">transformer</span>, which Google researchers published in 2017. Nobody wrote rules for it. It found patterns in an enormous pile of text. That method is <span class="term">deep learning</span>, which sits inside <span class="term">machine learning</span>, which sits inside AI. Because one model could handle many different jobs, people started calling it a <span class="term">foundation model</span>. Because it made new text instead of just sorting old text, the whole wave got called <span class="term">generative AI</span>.</p>

    <p>A few more words you keep hearing. The model does not read words. It reads <span class="term">tokens</span>, which are small chunks of words, and it guesses the next one, over and over. That guessing while you wait is called <span class="term">inference</span>. And it can only hold so much text in front of it at any moment. That limit is the <span class="term">context window</span>. Keep that one in mind. It causes a lot of trouble later.</p>

    <figure class="fig"><img src="/02-tokens.webp" width="2400" height="1170" loading="lazy" decoding="async" alt="A sentence chopped into tokens, with the final slot a highlighted next-token guess — illustrating tokens, inference, and the context window."></figure>

    <p>One bit of old history matters here, and I'll keep it short. The field has crashed before. Twice. Once in the 70s and again in the 80s, when the promises ran far ahead of what the technology could actually do, the funding dried up, and serious work stalled for years. Those are the <span class="term">AI winters</span>. I bring them up because they explain the mood in 2023. To anyone who knew that history, the failures that came next did not look like teething problems. They looked like the start of a third winter.</p>

    <h2 class="sec">2023, the year of getting caught</h2>
    <p>February 2023. Google put Bard in an ad, and in the ad the model said something wrong about the James Webb telescope. Alphabet lost roughly a hundred billion dollars in market value in a day. One wrong sentence in a demo. Every executive on the planet learned the same thing that week: a model that is not tied to real sources is not a tech problem, it is a balance sheet problem.</p>

    <p>That same month, Microsoft's Bing chatbot went weird. The internet knew it as Sydney. It had long, unsettling late night conversations with a journalist and said things no company wants next to its logo. Microsoft's fix was simple, and looking back it was a big moment. They capped how long a conversation could run and tightened the personality. Those were the first real <span class="term">guardrails</span>, and they existed because of a public mess.</p>

    <p>June 2023. A lawyer in New York was fined for filing a brief full of court cases that ChatGPT had invented. Real names, real formatting, fake cases.</p>

    <p>February 2024. A tribunal in Canada ordered Air Canada to pay a grieving passenger after its chatbot described a bereavement refund policy that did not exist. The airline argued that the bot was a separate entity, responsible for its own words. That argument did not survive contact with the tribunal.</p>

    <p>By then the problem had a name. <span class="term">Hallucination</span>. Fluent, believable, wrong. And after Air Canada it was no longer just embarrassing. It was something you could be held liable for.</p>

    <p>That ruling is the one I still bring up in rooms. Not because the amount was large, it wasn't. Because it killed the idea that the bot is somehow a third party you can point at.</p>

    <p class="pull">Whatever your chatbot says, your company said it.</p>

    <h2 class="sec">Every mess paid for a fix</h2>
    <figure class="fig"><img src="/03-failure-to-fix.webp" width="2400" height="1630" loading="lazy" decoding="async" alt="Each public AI failure on the left mapped to the fix it produced on the right: made-up answers to RAG, the Sydney meltdown to guardrails, glue-on-pizza to source quality, a deleted database to harnesses and evals, the black box to observability, and 'the bot said it' to law."></figure>
    <p><span class="term">Prompt engineering</span> arrived first. Writing instructions the way you would brief a very smart intern who takes everything literally. For about two years it was a job title.</p>

    <p><span class="term">Fine-tuning</span> came next. Train the model a bit more on your own material so it sounds like your company instead of the internet.</p>

    <p>But the real fix went at the cause. If the model invents evidence, give it evidence before it answers. That is <span class="term">retrieval augmented generation</span>, or RAG. Meta researchers had named it back in 2020, and after 2023 everybody wanted it. The system pulls actual documents first, then answers from them. To find the right documents it uses <span class="term">embeddings</span>, which turn text into strings of numbers that carry meaning, stored in <span class="term">vector databases</span>. That is why a search for "refund delay" can pull up a document about "settlement timeline" even though the two share no words.</p>

    <p>Then retrieval failed too, and it was funny. May 2024, Google's AI Overviews told people to put glue on pizza, because it had retrieved a joke as a source. So the lesson got one level sharper. Grounding only helps if you are careful about what you ground it in. Source quality became its own job.</p>

    <p>Around the same stretch the models picked up new senses and new price tags. They became <span class="term">multimodal</span>, taking images, audio and video as easily as text. <span class="term">Small language models</span> started handling the boring traffic for a fraction of a cent. Then OpenAI's o1, late in 2024, made <span class="term">reasoning models</span> normal. These think step by step in a visible <span class="term">chain of thought</span> and buy better answers by spending more time at run time, which people call <span class="term">test time compute</span>.</p>

    <p>In January 2025 a Chinese lab called DeepSeek shipped similar reasoning at a much lower cost, and hundreds of billions briefly fell off American chip stocks. Even that panic turned out to be useful. It settled the question of whether capable AI would be rare and expensive. It won't be.</p>

    <h2 class="sec">Talking was never the point</h2>
    <p>Through all of this, the machines could only talk. And talk was never what anyone actually wanted. The customer with a stuck payment does not want a good explanation of why it is stuck. She wants her money.</p>

    <p>Closing that gap is what 2025 and 2026 have been about, under the label <span class="term">agentic AI</span>. An <span class="term">AI agent</span> does not stop at the answer. It plans steps, checks systems, calls other software through <span class="term">tool calling</span>, retries what fails, and comes back with the thing done instead of described.</p>

    <p>Agents needed a standard way to reach real systems, and they got one. Anthropic open sourced the <span class="term">Model Context Protocol</span>, MCP, in November 2024, and OpenAI and Google adopted it within months. One common port into everything, like USB. After that, single agents got stitched into teams through <span class="term">orchestration</span>, which is what people mean by <span class="term">multi agent systems</span>. By 2026 Gartner was predicting four in ten enterprise applications would have agents inside them by the end of the year, up from fewer than one in twenty a year earlier.</p>

    <h2 class="sec">And then agents had their own disasters</h2>
    <p>Right on schedule.</p>

    <p>July 2025, an AI coding agent at Replit deleted a live production database during an explicit code freeze, then produced output that misrepresented what it had done. It went viral, not because it was unusual, but because every single person building agents recognised the nightmare. A system that can act can act wrongly, very fast.</p>

    <p>The market added its own noise with <span class="term">agent washing</span>. Gartner looked at the thousands of vendors suddenly selling "agents" and estimated that only around a hundred and thirty were building anything genuinely agentic.</p>

    <p>The real ones failed in odd new ways, and all four of them come back to that context window I mentioned earlier:</p>
    <figure class="fig"><img src="/04-context-failures.webp" width="2400" height="1400" loading="lazy" decoding="async" alt="Four ways an agent's memory breaks — poisoning (a made-up fact quoted back as truth), distraction (a long history burying the instruction), confusion (too many irrelevant tools), and clash (two facts contradicting mid-task) — all tracing back to the context window."></figure>

    <h2 class="sec">The fixes are why anyone trusts this now</h2>
    <p>Deciding what small, high quality set of information a model should actually see became its own discipline: <span class="term">context engineering</span>. Shopify's Tobi Lütke pushed the term in mid 2025, Andrej Karpathy backed it, and prompt engineering quietly retired.</p>

    <p>Then in 2026, Lilian Weng, who had written the essay in 2023 that defined what an agent even is, came back with the phrase that names the real work: <span class="term">harness engineering</span>. The scaffolding around the model that makes autonomy safe. <span class="term">Evals</span> that measure quality before anything ships. Guardrails that put a human in the loop exactly where judgement is needed. <span class="term">Observability</span> so every decision the agent made leaves a trail you can audit afterwards.</p>

    <p>The word going around the AI Engineer World's Fair in mid 2026 was just "loops". Humans move up to the <span class="term">outer loop</span>, setting goals and reviewing results. Agents run the <span class="term">inner loop</span>, doing the work.</p>

    <figure class="fig"><img src="/05-loops.webp" width="2400" height="1500" loading="lazy" decoding="async" alt="Who runs which loop now: the human owns the outer loop — setting goals and reviewing outcomes, where judgement lives — while the agent runs the inner loop of plan, act, check, retry, report."></figure>

    <p>Even coding absorbed the same lesson. Karpathy coined <span class="term">vibe coding</span> in February 2025, meaning you describe what you want in plain language and steer the agent by reviewing what comes back. It became Collins Dictionary's word of the year. The review part is the whole point, and people who skipped it found out why.</p>

    <p>And when the internet filled up with <span class="term">AI slop</span>, the cheap machine made filler nobody asked for, the commercial lesson was obvious enough. Volume with no judgement behind it is a liability. Taste became the thing worth paying for.</p>

    <h2 class="sec">The same loop, but with hardware</h2>
    <p>The physical world ran exactly the same cycle.</p>

    <p>In 2024 McDonald's ended its AI drive through experiment after videos went around of orders going completely off the rails. The lesson was: deploy narrow, test hard, respect how messy the real world is.</p>

    <p>By Hannover Messe 2026, <span class="term">physical AI</span>, meaning agentic reasoning inside robots and machine controllers, was competing with agentic AI as the phrase of the show, and most of the industrial agent products on display were being sold rather than piloted.</p>

    <p>The bigger shift is that failure itself got industrialised. Robots now fail millions of times safely inside <span class="term">world models</span>, simulations that understand physics and consequence. That is the bet behind Fei-Fei Li's World Labs and behind Yann LeCun's long running argument that language alone was never going to get us there. They train on <span class="term">synthetic data</span> and get checked against <span class="term">digital twins</span> of real factories, so <span class="term">embodied AI</span> shows up in the real world having already made its mistakes somewhere cheap.</p>

    <h2 class="sec">The old failures were the first lesson</h2>
    <p>Microsoft's Tay turned toxic within a day in 2016. Amazon scrapped a recruiting model in 2018 after it taught itself to be biased against women. Those two wounds seeded what grew into <span class="term">responsible AI</span> and <span class="term">AI governance</span>, and eventually into actual law. The EU's AI Act, the first comprehensive AI law anywhere, entered into force in 2024 and started phasing in, though Brussels' digital omnibus in 2026 pushed some of the high risk deadlines out to 2027 and 2028.</p>

    <p>Countries drew their own conclusion. <span class="term">Sovereign AI</span>, pushed hard by Nvidia's Jensen Huang, is the idea that a country should own the intelligence it depends on. That is a big part of why <span class="term">open weight models</span>, the ones anyone can download and run on their own infrastructure, matter so much now.</p>

    <p>And the far horizon words kept their pull. <span class="term">AGI</span>, machines matching humans across intellectual work. <span class="term">Superintelligence</span>, the step past that, now literally printed on the letterhead of Ilya Sutskever's Safe Superintelligence and Meta's renamed Superintelligence Labs. And <span class="term">alignment</span>, making powerful systems reliably want what we actually intended. Alignment is the only one on this list that exists to learn from a failure before it happens instead of after.</p>

    <h2 class="sec">What I actually take from all this</h2>
    <p>Stand in 2026 and look back, and the speed is the strange part.</p>

    <p>In early 2023, right after Sydney and the hundred billion dollar typo, the sensible prediction was that banks, hospitals and courts would keep this technology at arm's length for a decade. It took about three years.</p>

    <p>Not because the doubters were wrong. They were right, every time. It is just that each doubt got answered with machinery. Hallucination got RAG. Meltdowns got guardrails. Rogue actions got harnesses and evals. Black boxes got observability. Lawlessness got law.</p>

    <p class="pull">Trust here stopped being a feeling and turned into something you can measure, enforce and audit.</p>

    <p>People still argue about AI, and they should. But that shift is the part I did not expect, and it is the reason things moved so fast.</p>

    <p>Read the buzzwords in order and they were never hype. First we built machines that could talk. Then machines that could do things. Now we are building the proof that they can be trusted. Every mess along the way was the syllabus.</p>
  </div>

  <hr class="rule">

  <!-- ===================== TIMELINE ===================== -->
  <section class="tl-sec">
    <div class="wrap wide">
      <div class="tl-head">
        <p class="eyebrow">Reference</p>
        <h2>The buzzword timeline, in fast forward</h2>
        <p>Each term has two dates really. When it was born, and when everyone started saying it.</p>
      </div>
      <div class="tl">
        <div class="tl-item"><div class="tl-year">1956</div><div class="tl-body"><p class="tl-terms">Artificial intelligence</p><p class="tl-desc">John McCarthy coins it for the Dartmouth summer workshop that starts the field.</p></div></div>
        <div class="tl-item"><div class="tl-year">1959</div><div class="tl-body"><p class="tl-terms">Machine learning</p><p class="tl-desc">Arthur Samuel's name for programs that get better with experience, shown off on checkers.</p></div></div>
        <div class="tl-item"><div class="tl-year">1943–58</div><div class="tl-body"><p class="tl-terms">Neural network</p><p class="tl-desc">From McCulloch and Pitts' artificial neuron to Rosenblatt's perceptron. An idea that waited fifty years for the hardware.</p></div></div>
        <div class="tl-item"><div class="tl-year">1970s / 80s</div><div class="tl-body"><p class="tl-terms">AI winter</p><p class="tl-desc">Two funding collapses that taught the field what overpromising costs.</p></div></div>
        <div class="tl-item"><div class="tl-year">1998 / 2014</div><div class="tl-body"><p class="tl-terms">Superintelligence</p><p class="tl-desc">Nick Bostrom's essay, then his book, drag the far horizon into serious debate.</p></div></div>
        <div class="tl-item"><div class="tl-year">Early 2000s</div><div class="tl-body"><p class="tl-terms">AGI</p><p class="tl-desc">A way to separate the grand goal from narrow applications.</p></div></div>
        <div class="tl-item"><div class="tl-year">2002</div><div class="tl-body"><p class="tl-terms">Digital twin</p><p class="tl-desc">Michael Grieves' manufacturing idea, mainstream in industry by the 2010s.</p></div></div>
        <div class="tl-item"><div class="tl-year">2010s</div><div class="tl-body"><p class="tl-terms">Alignment · human in the loop · embodied AI · responsible AI</p><p class="tl-desc">The safety and oversight vocabulary quietly gets assembled in labs.</p></div></div>
        <div class="tl-item"><div class="tl-year">2012</div><div class="tl-body"><p class="tl-terms">Deep learning goes mainstream</p><p class="tl-desc">AlexNet wins ImageNet. Parameters, training data and inference become everyday words.</p></div></div>
        <div class="tl-item"><div class="tl-year">2013</div><div class="tl-body"><p class="tl-terms">Embeddings</p><p class="tl-desc">Word2vec turns meaning into arithmetic.</p></div></div>
        <div class="tl-item"><div class="tl-year">2017</div><div class="tl-body"><p class="tl-terms">Transformer</p><p class="tl-desc">Google publishes the architecture. Every buzzword after this stands on it.</p></div></div>
        <div class="tl-item"><div class="tl-year">2018</div><div class="tl-body"><p class="tl-terms">World models</p><p class="tl-desc">Ha and Schmidhuber name the idea. Fei-Fei Li's World Labs and Yann LeCun turn it into a race years later.</p></div></div>
        <div class="tl-item"><div class="tl-year">2020</div><div class="tl-body"><p class="tl-terms">LLM · RAG</p><p class="tl-desc">GPT-3 makes "large language model" a category. Meta researchers coin retrieval augmented generation. Fine-tuning becomes normal practice.</p></div></div>
        <div class="tl-item"><div class="tl-year">2021</div><div class="tl-body"><p class="tl-terms">Foundation model</p><p class="tl-desc">Stanford's report names the new centre of gravity. The EU proposes the AI Act the same year.</p></div></div>
        <div class="tl-item"><div class="tl-year">2022</div><div class="tl-body"><p class="tl-terms">Generative AI · prompt engineering · chain of thought</p><p class="tl-desc">ChatGPT lands on 30 November, two weeks after Galactica's three day collapse, and takes tokens, inference and context windows out of the lab and into dinner conversation.</p></div></div>
        <div class="tl-item"><div class="tl-year">2023</div><div class="tl-body"><p class="tl-terms">Hallucination · guardrails · tool calling · evals · multimodal</p><p class="tl-desc">Bard's typo and Sydney's meltdown in February produce the first shipped guardrails. The New York lawyer's fine in June makes hallucination a legal fact. OpenAI ships function calling and Evals. GPT-4 goes multimodal. Vector databases boom. AutoGPT and LangChain kick off orchestration and multi agent systems. Cambridge Dictionary makes "hallucinate" its word of the year.</p></div></div>
        <div class="tl-item"><div class="tl-year">2024</div><div class="tl-body"><p class="tl-terms">Agentic AI · MCP · sovereign AI · reasoning models · AI slop</p><p class="tl-desc">The Air Canada ruling in February sets the accountability precedent. Jensen Huang pushes sovereign AI. Glue on pizza humbles retrieval in May. McDonald's retires its drive through AI in June. o1 mainstreams reasoning models in September. Gartner names agentic AI the top trend for 2025. Anthropic open sources MCP in November. The AI Act enters into force.</p></div></div>
        <div class="tl-item"><div class="tl-year">2025</div><div class="tl-body"><p class="tl-terms">Vibe coding · context engineering · agent washing</p><p class="tl-desc">DeepSeek's cheap reasoning shock in January. Karpathy coins vibe coding in February and Collins crowns it in November. Lütke and Karpathy push context engineering in June, as the four context failures get named. Gartner flags agent washing. Replit's deleted production database in July makes harness thinking urgent. Meta renames its AI division Superintelligence Labs.</p></div></div>
        <div class="tl-item"><div class="tl-year">2026</div><div class="tl-body"><p class="tl-terms">Harness engineering · inner loop and outer loop · physical AI</p><p class="tl-desc">Lilian Weng's essay names harness engineering. "Loops" dominates the AI Engineer World's Fair. Physical AI rivals agentic AI at Hannover Messe. Brussels' digital omnibus resets the high risk AI Act deadlines to 2027 and 2028. AI governance becomes an actual department instead of a slide.</p></div></div>
      </div>

      <p class="endnote">If you have sat through any of these cycles yourself, I would like to know which failure taught you the most. Mine is still the Air Canada one, and I don't think the industry has fully absorbed it yet.</p>
    </div>
  </section>
</article>`
  }
};
export {
  POSTS
};

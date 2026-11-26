const state = { burden: 20, support: 0, scene: 0, lines: [], lineIndex: 0, waitingChoice: false, choiceConsumed: false, branches: {}, flags: {}, typing: false, typingTimer: null, typingElement: null, typingText: '', typingIndex: 0 };
const $ = (id) => document.getElementById(id);
const sceneBackgrounds = {
jiwoo:[
  'classroom-pencil.png','phone-break.jpg','group-project-before.jpg','cafeteria.png',
  'teacher-wait.jpg','phone-memory.jpg','hallway-friend.png','counselor-door-closed.jpg','counseling-room.png'
],
taeho:['taeho-rumor-classroom.jpg','classroom-pencil.png','group-project-quiet.png','group-project-before.jpg','cafeteria.png','taeho-office-hallway.jpg','taeho-bedroom-night.jpg','taeho-jiwoo-hallway.jpg','taeho-teacher-meeting.jpg'],
minseo:['classroom-pencil.png','phone-break.jpg','group-project-before.jpg','cafeteria.png','teacher-wait.jpg','minseo-bedroom.jpg','hallway-friend.png','counselor-door-closed.jpg','ending-minseo-lunch.jpg']
};
const jiwooScenes = [
  { title:'교실 문 앞', lines:[
    ['나레이션','교실 문 바깥. 안쪽에서 여러 목소리가 겹쳐 들린다. 지우가 문을 열자 대화가 멈추고, 책장 넘기는 소리만 남는다.'],
    ['도현','태오가 그러던데. 지우가 헤어지고 바로 새 사람 만났대.'],
    ['나레이션','민서는 도현의 말을 듣다가 무언가 말하려는 듯 숨을 들이키지만, 끝내 입을 다문다. 지우가 들어오자 시선을 피한다.'],
    ['도현','그래도 벌써 다른 사람 만나는 건 좀 그렇지 않냐?'],
    ['나레이션','지우는 새로 만나는 사람이 있다는 사실을 친구들에게 설명한 적이 없다. 방금 말이 자신을 두고 한 이야기인지 확신할 수 없지만, 멈춘 분위기가 마음에 걸린다.'],
    ['지우','무슨 이야기 해?'],['도현','그냥, 태오한테 들은 얘기야.'],['나레이션','민서는 무언가 말하려다 멈춘다. 지우와 눈이 마주치자 필통 쪽으로 시선을 돌린다.']
  ], change:[4,0] },
  { title:'쉬는 시간', lines:[
    ['나레이션','도현이 친구들에게 단체방 화면을 보여준다. 화면은 지우에게 보이지 않는다. 민서는 불편한 듯 짧게 웃지만, 곧 웃음을 거두고도 도현을 말리지 않는다.'],
    ['도현','내가 어제 보낸 얘기 봤어?'],['민서','응…… 봤어.'],['지우','어떤 거?'],['도현','태오한테 들은 얘기.'],['지우','어디에 보냈는데?'],['도현','단체방에.']
  ], choices:[
    { text:'“나도 보여줘”라고 말한다', change:[11,0], next:[['지우','나도 보여줘.'],['도현','별거 아니라니까.'],['지우','알겠어.'],['나레이션','도현은 휴대전화를 뒤집어 놓고 다른 이야기로 넘어간다. 지우는 더 묻지 못한다.']] },
    { text:'그냥 넘어간다', change:[6,0], next:[['나레이션','지우는 대화에 끼지 못한 채 도현과 친구들의 반응을 바라본다. 민서는 웃음을 거두지만 더는 말을 잇지 않는다. 잠시 어색함은 피했지만, 자신을 둘러싼 이야기가 무엇인지는 알 수 없다.']] }
  ] },
  { title:'조별과제', lines:[
    ['나레이션','조별과제 주제와 역할을 정해 제출하는 시간. 지우가 자리에 도착했을 때 도현은 거의 결정을 마치고 역할표를 작성 중이다. 자료는 지우가 없는 단체방에 올라와 있다. 민서는 지우 이름이 비어 있는 칸을 보지만, 곧바로 말하지 못한다.'],
    ['도현','일단 역할은 우리끼리 정하자. 제출 시간 다 됐어.'],['나레이션','민서는 도현이 정한 역할을 공책에 옮겨 적다가 지우의 빈칸을 보고 손을 멈춘다.'],['지우','미안, 정리가 늦게 끝났어. 어디까지 했어?'],['도현','거의 다 정했어. 지금 적고 있어.'],['지우','자료는 어디서 봐?'],['도현','아까 올렸는데…… 아, 너 그 방에 없지.']
  ], choices:[
    { text:'“그러면 나는 뭐 하면 돼?”라고 묻는다', change:[13,0], background:'group-project-ask.png', next:[['지우','그러면 나는 뭐 하면 돼?'],['도현','지금 거의 다 나눴어. 남는 일 있으면 알려줄게.'],['지우','그럼 나도 자료부터 보면 안 돼?'],['민서','자료 링크는 내가 보내줄게. 그리고…… 네 이름이 빠진 걸 봤는데도 아까 말하지 못했어. 미안해.'],['나레이션','민서는 자료를 건네지만, 이미 제출된 역할표에는 지우의 이름이 없다. 지우는 뒤늦은 사과와 배제된 결과를 함께 마주한다.']] },
    { text:'옆에 앉아 친구들이 정하는 것을 듣는다', change:[8,0], background:'group-project-quiet.png', next:[['나레이션','지우는 말을 꺼내려다 멈춘다. 도현은 역할표를 제출한다. 민서는 지우의 빈 이름 칸을 바라보지만, 결국 아무 말도 하지 못한다.']] }
  ] },
  { title:'급식실', lines:[['나레이션','급식실 테이블. 도현의 외투가 빈 의자 위에 놓여 있다. 민서는 맞은편에 앉아 있다. 지우가 다가오자 민서는 외투와 지우를 번갈아 보지만 말을 꺼내지 못한다.']], choices:[
    { text:'“여기 자리 있어?”라고 물어본다', change:[14,0], next:[['지우','여기 자리 있어?'],['도현','안 돼. 내 외투 둘 자리야.'],['나레이션','민서는 외투를 치우려 손을 뻗었다가 도현의 눈치를 보고 멈춘다.'],['지우','아, 그러면 다른 데 갈게.'],['나레이션','도현은 대화를 이어가고, 민서는 지우가 멀어지는 모습을 바라본다. 지우는 다른 테이블에 혼자 앉아 급하게 식사를 시작한다.']] },
    { text:'외투를 보고 조용히 다른 자리를 찾는다', change:[9,0], next:[['나레이션','빈자리가 보이지만 이미 여러 무리가 함께 앉아 있다. 지우는 결국 혼자 앉을 자리를 찾는다. 민서는 지우의 뒷모습을 바라보다가 다시 식판으로 시선을 내린다.']] }
  ] },
  { title:'방과 후, 교무실 앞', lines:[['나레이션','지우는 교무실 앞에서 잠시 멈춘다.'],['지우','선생님, 잠깐 얘기할 수 있어요?'],['담임','응, 무슨 일이야?'],['지우','요즘 애들이 제가 뭘 했다고 말하는 것 같고…… 단체방에서도 저만 모르는 얘기가 있어요.'],['담임','상황을 더 알아볼게. 친구들과 직접 이야기하기 부담스럽다면 혼자 해결하지 않아도 돼. 내일 다시 나와 이야기하자.'],['나레이션','담임은 지금 바로 해결을 약속하지는 않지만, 다음 날 다시 이야기할 시간을 정한다.']] , change:[4,8], choices:[
    {text:'담임에게 더 이야기한다',change:[5,14],background:'teacher-meeting.png',next:[['지우','과제 역할에서 제 이름이 빠져 있었고, 급식실에서도 함께 앉지 못했어요.'],['담임','알려줘서 고마워. 네가 원하는 도움과 당장 안전하게 지낼 방법부터 같이 생각해보자.']]},
    {text:'오늘은 더 말하지 않고 돌아간다',change:[3,0],next:[['나레이션','지우는 더 말할 일이 남아 있지만, 오늘은 교무실을 나선다. 다시 이야기할 수 있다는 담임의 말을 마음에 담아둔다.']]}
  ] },
  { title:'지우의 방', lines:[['나레이션','책상 위 휴대전화가 울린다. 옆에는 민서와 찍은 인생네컷이 놓여 있다. 사진 속 두 사람의 웃는 얼굴이 오늘 민서의 모습과 겹쳐 보인다.'],['도현','지우 오늘 담임 찾아갔다며? 무슨 말 했어?']], choices:[
    {text:'메시지를 열고 짧게 답한다',change:[8,3],next:[['지우','요즘 학교에서 힘들다고 말씀드렸어. 더는 이야기하고 싶지 않아.'],['나레이션','읽음 표시는 사라지지만 답장은 오지 않는다. 화면에는 도현의 메시지만 남아 있다.']]},
    {text:'지금은 메시지를 열지 않는다',change:[5,0],next:[['나레이션','잠금 화면에 알림만 남는다. 지우는 휴대전화를 내려놓고 잠시 숨을 고른다.']]}
  ] },
  { title:'복도', lines:[['나레이션','방과 후 복도. 민서는 벽 쪽에 서 있다. 말을 걸지 않고 지나갈 수도 있다.']], choices:[
    {text:'민서에게 말을 건다',change:[5,18],background:'minseo-conversation.png',next:[['지우','네가 소문을 시작한 건 아닌 거 알아. 그래도 네가 옆에서 웃고 아무 말도 안 했을 때 정말 혼자였어.'],['민서','맞아. 도현이가 태오의 말을 옮길 때 사실인지 묻거나 그만하자고 했어야 했어. 분위기 깨질까 봐 모른 척했어. 그건 내 잘못이야. 미안해.'],['지우','네가 대신 해결해줄 필요는 없어. 다만 내가 말할 때 들어줬으면 좋겠어.'],['민서','그럴게. 내가 직접 본 일만 선생님께 말할 수 있어. 네가 원하면 같이 가도 되고, 지금 정하지 않아도 돼.'],['지우','내일 네가 본 일을 선생님께 말해줄 수 있는지 생각해보고 싶어.'],['민서','알겠어. 네가 정할 때까지 기다릴게.']]},
    {text:'민서를 지나친다',change:[8,0],next:[['나레이션','민서는 지우를 부르려다 멈춘다. 지우는 복도 끝까지 걸어간다.']]}
  ] },
  { title:'상담실 문 앞', lines:[['나레이션','상담실 문 앞. 지우는 문손잡이에 손을 댔다가 내린다.']], choices:[
    {text:'상담실 문을 두드린다',change:[4,22],background:'counseling-room.png',next:[['상담 선생님','안녕, 지우야. 오늘 있었던 일 중 가장 먼저 이야기하고 싶은 것부터 말해도 돼.'],['지우','과제 역할표에서 제 이름이 비어 있었고, 급식실에서도 혼자 밥을 먹었어요.'],['상담 선생님','말해줘서 고마워. 네가 원하는 도움과 당장 안전하게 지낼 방법을 같이 확인해보자.']]},
    {text:'오늘은 상담실을 지나간다',change:[7,0],next:[['나레이션','지우는 오늘은 문을 두드리지 못한다. 내일 다시 올 수 있도록 상담실 위치를 기억해둔다.']]}
  ] },
  { title:'오늘의 끝', lines:[], ending:true }
];

const taehoScenes = [
  {title:'헤어진 다음 날',lines:[
    ['나레이션','헤어진 다음 날. 태오는 지우가 자신을 금세 잊을 것 같다는 생각에 화가 난다. 지우가 누군가와 연락하던 기억을 떠올리지만, 그 의미를 확인한 적은 없다.'],
    ['태오','지우는 헤어지기 전부터 다른 사람이 있었어.'],
    ['나레이션','직접 본 사실은 아니다. 태오는 화가 난 마음을 사실처럼 들리게 만들며 도현에게 말을 보낸다.'],
    ['태오','헤어지자마자 새 사람 만난 거야. 내가 다 알아.'],
    ['도현','진짜야?'],
    ['태오','……직접 본 건 아니야. 그래도 그랬을 거야.']
  ],change:[0,0]},
  {title:'교실 문 앞',lines:[
    ['나레이션','다음 날 교실. 도현이 태오에게 들었다며 지우 이야기를 꺼낸다. 태오는 교실 문 가까이에서 그 말을 듣는다.'],
    ['도현','태오가 그러던데. 지우가 헤어지고 바로 새 사람 만났대.'],
    ['나레이션','지우가 문을 열자 대화가 멈춘다. 태오는 처음엔 자신이 상처받은 만큼 지우도 난처해지는 모습에 잠깐 통쾌함을 느낀다.'],
    ['나레이션','하지만 지우가 아무 설명도 하지 못한 채 서 있는 모습을 보자, 자신이 한 말이 단순한 하소연을 넘어섰다는 생각이 스친다.']
  ],change:[0,0]},
  {title:'쉬는 시간',lines:[
    ['나레이션','도현이 단체방에 태오의 말을 옮겼다. 화면에는 확인되지 않은 이야기가 사실처럼 적혀 있다. 지우는 대화 바깥에 있고, 태오는 자신이 퍼뜨린 말임을 안다.'],
    ['도현','내가 어제 보낸 얘기 봤어?'],
    ['나레이션','친구들이 웃는 동안 태오는 잠깐 만족감을 느낀다. 그 감정은 짧지만, 지금 멈추지 않으면 지우가 감당할 일이 커질 수 있다.']
  ],choices:[
    {text:'단체방에서 내가 과장했다고 바로잡는다',change:[8,24],flags:{corrected:true},next:[['태오','그 말 사실 아니야. 내가 화나서 과장했어. 지우가 헤어지자마자 다른 사람을 만났다는 건 확인한 적 없어. 더 퍼뜨리지 말아줘.'],['도현','이미 다들 봤는데 이제 와서?'],['태오','내가 시작한 말이니까 내가 직접 바로잡을게.'],['나레이션','태오는 도현에게만 말하지 않고, 이야기를 본 친구들이 있는 곳에서 정정한다.'] ]},
    {text:'기분이 좋다는 이유로 모른 척한다',change:[0,0],next:[['나레이션','태오는 아무 말도 하지 않는다. 지우가 대화에서 밀려나는 모습을 보며 잠깐 우쭐하지만, 그 침묵이 도현의 행동을 더 쉽게 만든다.']]}
  ]},
  {title:'조별과제',lines:[
    ['나레이션','조별과제 역할을 정하는 시간. 도현은 지우가 없는 단체방에 자료를 올렸고, 지우가 도착했을 때 역할표는 거의 완성되어 있다. 태오는 자신의 말이 지우를 대하는 태도에 영향을 주고 있음을 알아차린다.'],
    ['도현','일단 역할은 우리끼리 정하자. 제출 시간 다 됐어.'],
    ['태오','잠깐. 지우 역할도 같이 정해야지. 그리고 내가 한 말은 사실이 아니야. 화나서 과장했어.'],
    ['나레이션','사실을 밝히는 일은 도현의 배제를 없던 일로 만들지 않는다. 그래도 지금 바로잡는 행동은 더 큰 확산을 멈추는 데 필요하다.']
  ],choices:[
    {text:'지우를 역할에 포함하고, 과장한 말을 분명히 밝힌다',change:[7,20],flags:{corrected:true},next:[['태오','지우도 역할을 고를 수 있게 기다리자. 내가 퍼뜨린 말은 확인한 사실이 아니야.'],['도현','알았어. 역할표 다시 보자.'],['나레이션','태오는 사과를 요구하거나 변명하지 않고, 자신이 시작한 말을 정정한다.']]},
    {text:'이미 정해진 일이니 끼어들지 않는다',change:[5,0],next:[['나레이션','태오는 지우의 빈 이름 칸을 보고도 지나친다. 책임을 깨달았지만 행동하지 않은 선택 역시 남는다.']]}
  ]},
  {title:'급식실',lines:[
    ['나레이션','급식실에서 도현은 빈 의자에 외투를 놓아둔다. 지우가 자리를 물어보지만 도현은 자기 자리라고 말한다. 태오는 지우가 혼자 다른 테이블로 가는 모습을 본다.'],
    ['나레이션','처음의 통쾌함은 더는 남아 있지 않다. 태오는 자신이 한 말이 지우의 하루를 어떻게 바꿨는지 외면하기 어려워진다.']
  ],choices:[
    {text:'도현에게 외투를 치우고 지우를 배제하지 말라고 한다',change:[8,18],flags:{corrected:true},next:[['태오','이제 그만하자. 내가 한 말부터 틀렸다고 바로잡을게. 지우를 계속 빼는 건 내가 원한 일도 아니야.'],['도현','네가 먼저 말 꺼냈잖아.'],['태오','맞아. 그래서 더 내가 책임지고 정정해야 해.']]},
    {text:'상황을 보고도 자리를 떠난다',change:[6,0],next:[['나레이션','태오는 도현의 행동을 멈추지 않는다. 이제는 소문뿐 아니라 배제까지 이어졌다는 걸 알면서도 지나친다.']]}
  ]},
  {title:'방과 후, 교무실 앞',lines:[
    ['나레이션','방과 후, 태오는 지우가 담임을 만나러 교무실에 들어가는 모습을 본다. 자신이 과장한 말 때문에 지우가 선생님에게까지 설명해야 하는 상황이 됐다.'],
    ['태오','내가 시작한 말인데…… 지우가 해명하게 만들었어.']
  ],choices:[
    {text:'담임에게 자신이 과장한 말과 퍼뜨린 경위를 알린다',change:[10,24],flags:{corrected:true,teacherTold:true},background:'taeho-teacher-meeting.jpg',next:[['태오','제가 화가 나서 확인하지 않은 말을 사실처럼 도현에게 전했어요. 그 말이 퍼졌고 지우가 배제되는 걸 봤는데도 바로잡지 않았습니다.'],['담임','말해줘서 고맙다. 지금부터는 지우의 안전과 의사를 먼저 살피고, 네가 한 행동에 대해서도 필요한 조치를 함께 논의하자.']]},
    {text:'들키면 곤란하다는 생각에 지나친다',change:[0,0],next:[['나레이션','태오는 사실을 알릴 기회를 또 미룬다. 잘못을 인정하는 일은 불편하지만, 침묵하면 소문과 피해는 저절로 멈추지 않는다.']]}
  ]},
  {title:'태오의 방',lines:[
    ['나레이션','저녁, 태오의 휴대전화에 도현의 메시지가 온다. 지우가 담임을 찾아갔다고 한다. 태오는 그제야 피해가 이미 어른에게 도움을 요청할 만큼 커졌다는 사실을 마주한다.'],
    ['도현','지우 오늘 담임 찾아갔다며? 우리 얘기한 거 말했나 봐.']
  ],choices:[
    {text:'도현에게 확산을 멈추고, 친구들에게 정정하겠다고 알린다',change:[7,24],flags:{corrected:true},next:[['태오','내가 먼저 과장해서 말했어. 그 내용은 사실이 아니야. 단체방에서도 정정할게. 더 이야기하지 말아줘.'],['나레이션','이미 늦었다고 느껴져도 정정은 필요하다. 태오는 지우에게 책임을 떠넘기지 않고, 자신이 만든 말의 경로를 되짚는다.']]},
    {text:'메시지를 읽고도 답하지 않는다',change:[0,0],next:[['나레이션','태오는 휴대전화를 내려놓는다. 아무 답도 하지 않는 동안에도 단체방의 잘못된 말은 남아 있다.']]}
  ]},
  {title:'복도',lines:[
    ['나레이션','다음 날 복도. 태오는 지우에게 말을 걸 기회를 얻는다. 지우가 지금 대화하고 싶어 하지 않을 수도 있다는 점도 생각해야 한다.']
  ],choices:[
    {text:'사과하고, 용서나 답을 요구하지 않는다',change:[8,12],flags:{apologized:true},next:[['태오','내가 화가 나서 네 이야기를 과장했어. 네가 헤어지자마자 다른 사람을 만났다는 말은 확인하지 않은 거야. 내가 시작한 말은 내가 정정할게. 미안해.'],['지우','그 말 때문에 힘들었어. 지금 바로 괜찮다고 말할 수는 없어.'],['태오','알아. 나를 용서하라고 하거나 네가 괜찮다고 말해달라고 하지 않을게.']]},
    {text:'지우에게 말을 걸지 않고 지나간다',change:[0,0],next:[['나레이션','태오는 사과를 미룬다. 지우가 먼저 다가와 문제를 해결해주기를 기다리는 것은 책임을 다하는 일이 아니다.']]}
  ]},
  {title:'오늘의 끝',lines:[],ending:true}
];

const minseoScenes = [
  {title:'교실 문 앞',lines:[
    ['나레이션','교실에서 도현이 태오에게 들었다는 말을 꺼낸다. 민서는 그 이야기가 사실인지 모른다. 지우가 들어오자 대화가 멈추고, 민서는 불편함을 느끼면서도 아무 말도 하지 못한다.'],
    ['도현','태오가 그러던데. 지우가 헤어지고 바로 새 사람 만났대.'],
    ['나레이션','민서는 소문을 시작하지 않았지만, 도현을 말리지 않은 채 시선을 피한다. 지우가 그 순간 혼자였다는 사실은 그대로 남는다.']
  ],change:[2,0]},
  {title:'쉬는 시간',lines:[
    ['나레이션','도현은 단체방 화면을 친구들에게 보여준다. 지우에게는 화면이 보이지 않는다. 민서는 어색하게 웃었다가, 자신이 웃음으로 분위기에 동조했다는 걸 깨닫고 입을 다문다.'],
    ['도현','내가 어제 보낸 얘기 봤어?'],
    ['나레이션','민서는 지금 말할 수 있었지만 말하지 않았다. 도현의 메시지는 단체방에 남아 있고, 지우는 자신을 둘러싼 이야기를 알지 못한다.']
  ],choices:[
    {text:'대화가 끝난 뒤 지우에게 괜찮은지 묻고, 듣고 싶은 만큼만 듣는다',change:[3,8],flags:{supportedJiu:true},next:[['민서','지우야, 아까 대화가 멈춘 거 봤어. 괜찮아? 지금 말하고 싶지 않으면 안 해도 돼.'],['지우','무슨 얘기였는지 모르겠는데, 다들 나를 보고 멈춘 것 같았어.'],['민서','내가 본 것만 말할게. 태오 얘기를 도현이가 꺼냈고, 나는 아무 말도 못 했어. 미안해.']]},
    {text:'어색함을 피하려고 아무 일도 없던 것처럼 행동한다',change:[5,0],next:[['나레이션','민서는 평소처럼 웃으며 자리를 뜬다. 지우에게 다가갈 기회는 지나가고, 불편함은 그대로 남는다.']]}
  ]},
  {title:'조별과제',lines:[
    ['나레이션','도현은 지우가 없는 단체방에서 자료를 정하고 역할표를 거의 완성했다. 민서는 지우의 이름이 비어 있는 걸 보지만, 말하면 분위기가 불편해질까 망설인다.'],
    ['도현','일단 역할은 우리끼리 정하자. 제출 시간 다 됐어.'],
    ['나레이션','민서는 자신이 침묵하면 지우의 참여 기회가 사라진다는 점을 안다.']
  ],choices:[
    {text:'역할표를 멈추고 지우도 역할을 고르게 하자고 말한다',change:[5,16],flags:{supportedJiu:true},next:[['민서','잠깐. 지우도 같이 역할을 정해야 해. 자료도 보내고, 지우가 할 수 있는 일을 같이 물어보자.'],['도현','거의 다 정했는데.'],['민서','그럼 다시 확인하면 돼. 지우 이름이 빠진 채 제출하면 안 돼.'],['나레이션','민서는 도현의 결정을 무시하지 않고, 빠진 사람을 포함시키도록 구체적으로 말한다.']]},
    {text:'도현의 눈치를 보며 역할표가 제출될 때까지 침묵한다',change:[6,0],next:[['나레이션','민서는 지우의 빈 이름 칸을 보면서도 아무 말도 하지 못한다. 지우는 역할을 정하는 과정에서 또 빠진다.']]}
  ]},
  {title:'급식실',lines:[
    ['나레이션','도현의 외투가 빈 의자를 차지하고 있다. 지우가 자리를 묻자 도현은 자기 외투 자리라고 답한다. 민서는 의자를 비워주고 싶지만 도현의 반응을 살핀다.']
  ],choices:[
    {text:'외투를 치우고 지우에게 앉을지 먼저 묻는다',change:[4,16],flags:{supportedJiu:true},next:[['민서','이 의자 비었어. 지우야, 여기 앉을래?'],['도현','내 외투 둘 자리야.'],['민서','외투는 옆으로 옮기면 돼. 지우가 앉을 자리를 막아둘 이유는 없어.'],['나레이션','민서는 지우 대신 결정하지 않고, 자리를 선택할 수 있도록 묻는다.']]},
    {text:'도현이 불편해할까 봐 식사를 계속한다',change:[6,0],next:[['나레이션','민서는 지우가 다른 테이블로 가는 모습을 본다. 도현의 외투는 빈자리를 계속 차지하고 있다.']]}
  ]},
  {title:'방과 후, 교무실 앞',lines:[
    ['나레이션','지우가 교무실 앞에서 멈춘다. 민서는 무슨 일이 있었는지 전부 알지 못한다. 따라가서 캐묻기보다, 지우가 원하는 도움을 먼저 물어야 한다.']
  ],choices:[
    {text:'지우에게 같이 들어갈지 묻고 선택을 맡긴다',change:[3,18],flags:{supportedJiu:true},next:[['민서','지우야, 선생님께 말하고 싶어? 원하면 같이 들어갈게. 지금은 혼자 있고 싶으면 기다릴게.'],['지우','아직 잘 모르겠어. 잠깐만 생각할래.'],['민서','알겠어. 네가 정할 때까지 여기 있을게.']]},
    {text:'지우의 사생활이라 생각해 아무 말 없이 지나간다',change:[5,0],next:[['나레이션','민서는 지우가 혼자 망설이는 모습을 보지만, 말을 걸지 않는다. 사생활을 존중한다는 이유로 필요한 도움을 물어볼 기회도 놓친다.']]}
  ]},
  {title:'민서의 방',lines:[
    ['나레이션','집에 돌아온 민서는 지우와 찍은 인생네컷을 본다. 교실에서 웃었던 자신의 모습과 지우가 혼자 남은 장면이 떠오른다. 휴대전화에는 도현의 메시지가 와 있다.'],
    ['도현','지우 오늘 담임 찾아갔다며? 무슨 말 했어?'],
    ['나레이션','민서는 단체방에 즉흥적으로 답장을 쓰지 않는다. 자신이 직접 본 일과 모르는 일을 구분하고, 지우에게 부담을 주지 않는 도움을 생각한다.']
  ],choices:[
    {text:'도현에게는 답하지 않고, 지우에게 개인 메시지를 보낸다',change:[5,18],flags:{supportedJiu:true},chatTitle:'지우',next:[['나레이션','민서는 단체방에서 즉흥적으로 말하지 않는다. 도현의 질문에는 답하지 않고, 지우에게 따로 연락해 괜찮은지 묻기로 한다.'],['민서','지우야, 오늘 괜찮아? 지금 답하지 않아도 돼. 네가 원하면 내가 본 일을 같이 정리해줄게.'],['지우','고마워. 아직 조금 조심스럽지만, 내일 같이 이야기해줄 수 있어?'],['민서','응. 네가 원하는 만큼만 말하고, 네가 정하는 대로 할게.']]},
    {text:'도현의 메시지를 닫고 아무것도 하지 않는다',change:[4,0],next:[['나레이션','민서는 휴대전화를 내려놓는다. 자신이 직접 본 일을 말할 기회가 남아 있지만, 아직 행동으로 옮기지 않는다.']]}
  ]},
  {title:'복도',lines:[
    ['나레이션','다음 날 복도에서 민서는 지우와 마주친다. 민서는 사과만으로 지우에게 용서를 요구하지 않으면서, 실제로 도움이 필요한지 물어볼 수 있다.']
  ],choices:[
    {text:'침묵했던 일을 인정하고, 지우가 원하는 도움을 묻는다',change:[5,18],flags:{supportedJiu:true},next:[['민서','내가 그때 아무 말도 안 해서 미안해. 내가 먼저 소문을 만든 건 아니지만, 옆에서 보고도 침묵했어. 네가 원하면 내가 본 일을 선생님께 말할게.'],['지우','네가 시작한 건 아닌 거 알아. 그래도 같이 웃고 침묵했을 때 혼자였어. 네가 대신 해결할 필요는 없지만, 내 이야기를 들어줬으면 좋겠어.'],['민서','그럴게. 네가 원하는 방식과 속도를 따를게.']]},
    {text:'지우가 먼저 말을 걸 때까지 기다린다',change:[4,0],next:[['나레이션','민서는 지우가 먼저 다가오기를 기다린다. 지우가 도움을 청할 책임까지 혼자 지게 된다는 점은 바뀌지 않는다.']]}
  ]},
  {title:'상담실 문 앞',lines:[
    ['나레이션','민서는 상담실 앞에서 멈춘다. 직접 보지 않은 일을 대신 설명하거나 지우를 밀어붙이지 않고, 자신이 목격한 사실을 말할 수 있다.']
  ],choices:[
    {text:'지우의 동의를 구하고, 목격한 사실을 함께 전한다',change:[4,22],flags:{supportedJiu:true,teacherTold:true},background:'minseo-counselor-meeting.jpg',next:[['민서','지우가 괜찮다면 제가 직접 본 일도 말씀드리고 싶어요. 도현이가 확인되지 않은 말을 옮겼고, 조별과제와 급식 자리에서도 지우가 빠지는 걸 봤어요.'],['상담 선생님','말해줘서 고마워. 지우가 원하는 방식으로 다음 단계를 함께 정하자. 민서도 본 사실만 말해주면 돼.']]},
    {text:'지우에게 선택권을 남기고, 필요할 때 다시 돕겠다고 말한다',change:[3,8],flags:{supportedJiu:true},next:[['민서','오늘 함께 들어가지 않아도 괜찮아. 네가 원하면 내가 본 일을 말할 수 있어. 네가 정할 때까지 기다릴게.'],['나레이션','민서는 즉시 해결을 약속하지 않지만, 다시 도움을 요청할 수 있는 통로를 남긴다.']]}
  ]},
  {title:'오늘의 끝',lines:[],ending:true}
];

const perspectiveInfo={
  jiwoo:{number:'01',label:'지우 시점',description:'피해자가 겪는 일과 도움을 요청하는 과정을 따라갑니다.',firstLabel:'정서적 부담',secondLabel:'도움 연결도',phoneSceneIndex:5,scenes:jiwooScenes},
  minseo:{number:'02',label:'민서 시점',description:'방관자 민서의 자리에서 침묵의 영향을 살피고, 지우의 뜻을 존중하며 돕는 방법을 찾습니다.',firstLabel:'방관 자각',secondLabel:'도움 연결도',phoneSceneIndex:5,scenes:minseoScenes},
  taeho:{number:'03',label:'태오 시점',description:'내가 시작한 말이 괴롭힘으로 번질 때, 늦더라도 바로잡을 책임을 생각합니다.',firstLabel:'책임 자각',secondLabel:'바로잡기 행동',phoneSceneIndex:6,scenes:taehoScenes}
};
let currentPerspective='jiwoo';
let scenes=jiwooScenes;
let pendingStoryIntro=false;
let phoneChatTitle='친구들';
const storyOrder=['jiwoo','minseo','taeho'];

function clamp(n){return Math.max(0,Math.min(100,n))}
function typeText(element,text,speed=24){
  window.clearInterval(state.typingTimer);
  state.typing=true;state.typingElement=element;state.typingText=text;state.typingIndex=0;
  element.textContent='';
  const chars=[...text];
  state.typingTimer=window.setInterval(()=>{
    if(state.typingIndex>=chars.length){finishTyping();return}
    element.textContent+=chars[state.typingIndex++];
    if(state.typingIndex>=chars.length)finishTyping();
  },speed);
}
function finishTyping(){
  if(!state.typing)return;
  window.clearInterval(state.typingTimer);
  state.typingElement.textContent=state.typingText;
  state.typing=false;state.typingTimer=null;state.typingElement=null;
}
function renderMeters(){ $('burden-value').textContent=state.burden; $('support-value').textContent=state.support; $('burden-fill').style.width=state.burden+'%'; $('support-fill').style.width=state.support+'%'; for(const id of ['burden-fill','support-fill']){const el=$(id);el.classList.remove('pulse');void el.offsetWidth;el.classList.add('pulse')} }
function showGaugeChange(change){[['burden-delta',change[0]],['support-delta',change[1]]].forEach(([id,amount])=>{const el=$(id);el.textContent=amount===0?'':`${amount>0?'+':''}${amount}`;el.classList.remove('show');if(amount!==0){void el.offsetWidth;el.classList.add('show')}})}
function setSceneBackground(index){setBackgroundFile(sceneBackgrounds[currentPerspective][index],scenes[index]?.title+' 장면 배경')}
function setBackgroundFile(file,alt){
  const img=$('background-image');
  img.classList.add('changing');
  window.setTimeout(()=>{img.src='./public/assets/'+file;img.alt=alt;img.onload=()=>img.classList.remove('changing')},180);
}
function setPhoneChatMode(active){
  const stage=document.querySelector('.stage');
  stage.classList.toggle('phone-chat-active',active);
  $('phone-chat').hidden=!active;
  document.querySelector('.dialogue').hidden=active;
}
function showPhoneChatLine(line){
  window.clearTimeout(state.ringTimer);$('phone-ring-effect').hidden=true;
  setPhoneChatMode(true);
  $('scene-title').textContent=scenes[state.scene].title;
  $('scene-counter').textContent='';$('phone-chat-title').textContent=phoneChatTitle;
  if(line[0]==='나레이션'){
    typeText($('phone-chat-note'),line[1],46);
  }else{
    $('phone-chat-note').textContent='';
    const bubble=document.createElement('article');
    const ownName=currentPerspective==='jiwoo'?'지우':currentPerspective==='minseo'?'민서':'태오';
    bubble.className='chat-message '+(line[0]===ownName?'outgoing':'incoming');
    if(line[0]!==ownName){
      const sender=document.createElement('span');sender.className='chat-sender';sender.textContent=line[0];bubble.append(sender);
    }
    const text=document.createElement('p');bubble.append(text);typeText(text,line[1]);
    $('phone-messages').append(bubble);
    $('phone-messages').scrollTop=$('phone-messages').scrollHeight;
  }
  $('choice-panel').replaceChildren();$('advance-button').hidden=true;
}
function ringPhone(){
  const effect=$('phone-ring-effect');effect.hidden=false;effect.classList.remove('ringing');void effect.offsetWidth;effect.classList.add('ringing');
  window.clearTimeout(state.ringTimer);state.ringTimer=window.setTimeout(()=>{effect.hidden=true;effect.classList.remove('ringing')},1350);
}
function setLines(lines){ state.lines=lines;state.lineIndex=0;state.waitingChoice=false;showLine(); }
function showLine(){
  const line=state.lines[state.lineIndex];
  if(!line){showChoicesOrNext();return}
  const phoneScene=state.scene===perspectiveInfo[currentPerspective].phoneSceneIndex;
  if(phoneScene&&state.lines===scenes[state.scene].lines&&state.lineIndex===0){setPhoneChatMode(false);$('phone-messages').replaceChildren();$('phone-chat-note').textContent='';phoneChatTitle='친구들';$('phone-chat-title').textContent=phoneChatTitle;ringPhone()}
  else if(phoneScene&&line[0]!=='나레이션'){showPhoneChatLine(line);return}
  else{setPhoneChatMode(false)}
  $('speaker').textContent=line[0];typeText($('line'),line[1],line[0]==='나레이션'?52:30);$('scene-title').textContent=scenes[state.scene].title;$('scene-counter').textContent=String(state.scene+1).padStart(2,'0')+' / 09';
  document.querySelector('.dialogue').classList.toggle('narration',line[0]==='나레이션');
  $('choice-panel').replaceChildren();$('advance-button').hidden=false;
}
function showChoicesOrNext(){
  const scene=scenes[state.scene];$('advance-button').hidden=true;
  if(scene.ending){showEnding();return}
  const panel=$('choice-panel');panel.replaceChildren();state.waitingChoice=true;
  scene.choices.forEach((choice,i)=>{const b=document.createElement('button');b.className='choice-button';b.innerHTML='<span class="choice-index">'+(i+1)+'</span>'+choice.text;b.addEventListener('click',()=>choose(choice));panel.append(b)});
}
function choose(choice){
  const before=[state.burden,state.support];state.burden=clamp(state.burden+choice.change[0]);state.support=clamp(state.support+choice.change[1]);const actual=[state.burden-before[0],state.support-before[1]];renderMeters();showGaugeChange(actual);
  if(state.scene===perspectiveInfo[currentPerspective].phoneSceneIndex&&choice.text.includes('메시지를 열지 않는다'))$('phone-messages').replaceChildren();
  if(choice.chatTitle){phoneChatTitle=choice.chatTitle;$('phone-chat-title').textContent=phoneChatTitle;$('phone-messages').replaceChildren();}
  if(choice.background)setBackgroundFile(choice.background,'선택에 따라 달라진 이야기 장면');
  state.branches['scene'+state.scene]=choice.text;Object.assign(state.flags,choice.flags||{});state.waitingChoice=false;state.choiceConsumed=true;$('choice-panel').replaceChildren();setLines(choice.next);
}
function advance(){
  if(state.typing){finishTyping();return}
  if(state.waitingChoice||$('transition-panel').hidden===false||scenes[state.scene]?.ending)return;
  if(state.lineIndex<state.lines.length-1){state.lineIndex++;showLine();return}
  const current=scenes[state.scene];
  if(current.choices&&!state.choiceConsumed){showChoicesOrNext();return}
  const nextIndex=state.scene+1;
  if(nextIndex>=scenes.length){state.scene=scenes.length-1;showEnding();return}
  showTransition(nextIndex);
}
function showTransition(nextIndex){
  state.pendingScene=nextIndex;
  $('transition-kicker').textContent='SCENE TRANSITION';
  $('transition-title').textContent='다음 장면: '+scenes[nextIndex].title;
  $('transition-description').textContent='이야기는 선택의 결과를 이어 다음 장면으로 넘어갑니다.';
  $('transition-continue').innerHTML='다음 장면으로 <span aria-hidden="true">→</span>';
  $('transition-panel').hidden=false;
  $('advance-button').hidden=true;
  $('choice-panel').replaceChildren();
}
function showStoryIntro(){
  const info=perspectiveInfo[currentPerspective];
  pendingStoryIntro=true;
  $('transition-kicker').textContent='STORY '+info.number+' · '+info.label;
  $('transition-title').textContent=info.label;
  $('transition-description').textContent=info.description;
  $('transition-continue').innerHTML='이 이야기 시작 <span aria-hidden="true">→</span>';
  $('transition-panel').hidden=false;$('choice-panel').replaceChildren();$('advance-button').hidden=true;
}
function beginNextScene(){
  if(pendingStoryIntro){pendingStoryIntro=false;$('transition-panel').hidden=true;setLines(scenes[0].lines);return}
  if(state.pendingScene==null)return;
  state.scene=state.pendingScene;state.pendingScene=null;state.choiceConsumed=false;
  setSceneBackground(state.scene);
  $('transition-panel').hidden=true;
  const next=scenes[state.scene];
  if(next.ending){showEnding();return}
  if(state.scene===perspectiveInfo[currentPerspective].phoneSceneIndex){$('phone-messages').replaceChildren();$('phone-chat-note').textContent='';setPhoneChatMode(false)}
  const change=next.change||[0,0],before=[state.burden,state.support];state.burden=clamp(state.burden+change[0]);state.support=clamp(state.support+change[1]);renderMeters();showGaugeChange([state.burden-before[0],state.support-before[1]]);setLines(next.lines);
}
function showEnding(){
  let endingData;
  if(currentPerspective==='taeho'){
    endingData=state.flags.corrected?{
      title:'늦었어도 바로잡기',image:'taeho-teacher-meeting.jpg',
      text:'태오는 자신이 화가 나서 과장한 말을 직접 정정하고, 도현에게 퍼뜨리는 일을 멈춰달라고 말했다. 뒤늦은 정정이 지우가 겪은 일을 없애지는 않는다. 태오는 다음으로 담임에게 자신이 한 일을 알리고, 지우에게 용서나 답을 요구하지 않은 채 책임지는 행동을 이어가기로 한다.'
    }:{
      title:'침묵으로 남은 말',image:'taeho-bedroom-night.jpg',
      text:'태오는 여러 번 바로잡을 기회를 지나쳤다. 처음에는 지우가 배제되는 모습에 통쾌함을 느꼈지만, 그 감정은 피해를 정당화하지 못한다. 이미 늦었다고 생각되는 순간에도 자신이 시작한 말을 정정하고, 어른에게 알려 확산을 멈추는 행동이 필요하다.'
    };
  }else if(currentPerspective==='minseo'){
    endingData=state.flags.supportedJiu?{
      title:'곁에서 시작한 용기',image:'ending-minseo-lunch.jpg',
      text:'민서는 지우의 이야기를 대신 결정하지 않고, 먼저 괜찮은지 묻고 자신이 직접 본 일을 전했다. 지우가 원하는 속도와 도움의 방식을 함께 정할 통로가 생겼다. 작은 개입이 모든 일을 즉시 해결하지는 않지만, 혼자 두지 않는 시작이 된다.'
    }:{
      title:'다음에는 먼저 묻기',image:'minseo-bedroom.jpg',
      text:'민서는 불편함을 느끼면서도 여러 번 침묵했다. 소문을 시작하지 않았더라도 방관의 영향은 남는다. 다음에는 지우에게 먼저 괜찮은지 묻고, 자신이 본 사실을 믿을 만한 어른에게 알리는 방식으로 도울 수 있다.'
    };
  }else{
    const counselorChosen=state.branches.scene7?.includes('문을 두드린다');
    const minseoChosen=state.branches.scene6?.includes('민서에게 말을 건다');
    const ending=minseoChosen?'minseo':counselorChosen?'counselor':'guardian';
    endingData={
      counselor:{title:'다시 이야기할 수 있는 사람',image:'ending-counseling.jpg',text:'지우는 상담 선생님에게 오늘 있었던 일을 꺼내놓았다. 상황이 바로 해결되지는 않았지만, 지우가 원하는 도움과 안전하게 지낼 방법을 함께 정할 사람이 생겼다.'},
      minseo:{title:'다시 이야기할 수 있는 사람',image:'ending-minseo-lunch.jpg',text:'민서는 다음 날 급식실에서 지우에게 먼저 사과하고 옆자리에 앉는다. 민서는 자신이 침묵으로 지우를 외롭게 했다는 점을 인정한다. 지우는 아직 조심스럽지만, 자신이 원하는 도움을 민서와 함께 정해보기로 한다.'},
      guardian:{title:'다음에 다시 말할 시간',image:'ending-guardian.jpg',text:'지우는 오늘 모든 이야기를 꺼내지는 못했다. 다음 날, 보호자와 담임은 지우가 혼자 감당하지 않도록 상태를 살피고 다시 이야기할 방법을 함께 찾는다.'}
    }[ending];
  }
  setBackgroundFile(endingData.image,endingData.title+' 장면');
  const {title,text}=endingData;
  $('scene-title').textContent=title;$('speaker').textContent='나레이션';typeText($('line'),text,52);$('scene-counter').textContent='END';document.querySelector('.dialogue').classList.add('narration');$('choice-panel').replaceChildren();$('advance-button').hidden=true;$('save-state').textContent='STORY '+perspectiveInfo[currentPerspective].number+' 완료';
  const nextIndex=storyOrder.indexOf(currentPerspective)+1;
  const action=document.createElement('button');action.className='choice-button ending-replay';
  if(nextIndex<storyOrder.length){
    const nextKey=storyOrder[nextIndex],nextInfo=perspectiveInfo[nextKey];action.textContent='STORY '+nextInfo.number+' · '+nextInfo.label+' 계속하기 →';action.addEventListener('click',()=>startStory(nextKey));
  }else{action.textContent='실천 약속 작성하기 →';action.addEventListener('click',showReflection);}
  $('choice-panel').append(action);
}
function startStory(key){
  currentPerspective=key;scenes=perspectiveInfo[key].scenes;
  $('perspective-label').textContent=perspectiveInfo[key].label;
  $('story-number').textContent='STORY '+perspectiveInfo[key].number;
  $('burden-label').textContent=perspectiveInfo[key].firstLabel;$('support-label').textContent=perspectiveInfo[key].secondLabel;
  resetStory();showStoryIntro();
}
function resetStory(){
  window.clearInterval(state.typingTimer);window.clearTimeout(state.ringTimer);state.typing=false;state.typingTimer=null;state.typingElement=null;
  state.burden=20;state.support=0;state.scene=0;state.pendingScene=null;state.choiceConsumed=false;state.branches={};state.flags={};state.lines=[];state.lineIndex=0;state.waitingChoice=false;pendingStoryIntro=false;
  state.burden=clamp(state.burden+(scenes[0].change?.[0]||0));state.support=clamp(state.support+(scenes[0].change?.[1]||0));renderMeters();showGaugeChange(scenes[0].change||[0,0]);setSceneBackground(0);
  phoneChatTitle='친구들';$('phone-chat-title').textContent=phoneChatTitle;$('phone-messages').replaceChildren();$('phone-chat-note').textContent='';setPhoneChatMode(false);$('scene-title').textContent=scenes[0].title;$('transition-panel').hidden=true;$('save-state').textContent='초안 플레이';
  document.querySelector('.dialogue').classList.remove('narration');
}
$('advance-button').addEventListener('click',advance);
document.querySelector('.dialogue').addEventListener('click',advance);$('phone-chat').addEventListener('click',advance);$('transition-continue').addEventListener('click',beginNextScene);document.addEventListener('keydown',e=>{if(!$('welcome-panel').hidden)return;if(e.target instanceof Element&&e.target.closest('button,textarea')?.isConnected)return;if(e.key==='ArrowRight'||e.code==='Space'){e.preventDefault();if(!$('transition-panel').hidden)beginNextScene();else advance()}});
function showReflection(){
  $('reflection-panel').hidden=false;$('choice-panel').replaceChildren();$('transition-panel').hidden=true;
  document.querySelector('.dialogue').hidden=true;$('phone-chat').hidden=true;
  const saved=JSON.parse(localStorage.getItem('classroom-vn-reflection')||'{}');
  $('reflection-victim').value=saved.victim||'';$('reflection-aggressor').value=saved.aggressor||'';$('reflection-bystander').value=saved.bystander||'';
  $('save-state').textContent='실천 약속';
}
$('reflection-save').addEventListener('click',()=>{
  const entries={victim:$('reflection-victim').value.trim(),aggressor:$('reflection-aggressor').value.trim(),bystander:$('reflection-bystander').value.trim(),savedAt:new Date().toISOString()};
  localStorage.setItem('classroom-vn-reflection',JSON.stringify(entries));$('reflection-status').textContent='이 기기에 실천 약속을 저장했어요.';
});
$('welcome-start').addEventListener('click',()=>{$('welcome-panel').hidden=true;startStory('jiwoo')});
resetStory();$('welcome-panel').hidden=false;

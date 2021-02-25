//感情語群
const all_emotions = {
    "basics": {
        "joy": {
            "jp_name": "喜び",
            "rank": 8,
            "color": "yellow",
            "angle": 1
        },
        "trust": {
            "jp_name": "信頼",
            "rank": 6,
            "color": "lime",
            "angle": 2
        },
        "fear": {
            "jp_name": "恐れ",
            "rank": 3,
            "color": "green",
            "angle": 3
        },
        "surprise": {
            "jp_name": "驚き",
            "rank": 7,
            "color": "aqua",
            "angle": 4
        },
        "sadness": {
            "jp_name": "悲しみ",
            "rank": 1,
            "color": "blue",
            "angle": 5
        },
        "disgust": {
            "jp_name": "嫌悪",
            "rank": 4,
            "color": "purple",
            "angle": 6
        },
        "anger": {
            "jp_name": "怒り",
            "rank": 2,
            "color": "red",
            "angle": 7
        },
        "anticipation": {
            "jp_name": "期待（予測）",
            "rank": 5,
            "color": "Orange",
            "angle": 8
        }
    },
    "dyads": {
        "optimism": {
            "consist_of": ["anticipation", "joy"],
            "jp_name": "楽観"
        },
        "hope": {
            "consist_of": ["anticipation", "trust"],
            "jp_name": "運命"
        },
        "anxiety": {
            "consist_of": ["anticipation", "fear"],
            "jp_name": "不安"
        },
        "love": {
            "consist_of": ["joy", "trust"],
            "jp_name": "愛"
        },
        "guilt": {
            "consist_of": ["joy", "fear"],
            "jp_name": "罪悪感"
        },
        "delight": {
            "consist_of": ["joy", "surprise"],
            "jp_name": "感動"
        },
        "submission": {
            "consist_of": ["trust", "fear"],
            "jp_name": "服従"
        },
        "curiosity": {
            "consist_of": ["trust", "surprise"],
            "jp_name": "好奇心"
        },
        "sentimentality": {
            "consist_of": ["trust", "sadness"],
            "jp_name": "感傷"
        },
        "awe": {
            "consist_of": ["fear", "surprise"],
            "jp_name": "畏怖"
        },
        "despair": {
            "consist_of": ["fear", "sadness"],
            "jp_name": "絶望"
        },
        "shame": {
            "consist_of": ["fear", "disgust"],
            "jp_name": "恥辱"
        },
        "disapproval": {
            "consist_of": ["surprise", "sadness"],
            "jp_name": "拒絶"
        },
        "unbelief": {
            "consist_of": ["surprise", "disgust"],
            "jp_name": "憤慨"
        },
        "outrage": {
            "consist_of": ["surprise", "anger"],
            "jp_name": "憎悪"
        },
        "remorse": {
            "consist_of": ["sadness", "disgust"],
            "jp_name": "後悔"
        },
        "envy": {
            "consist_of": ["sadness", "anger"],
            "jp_name": "悲憤"
        },
        "pessimism": {
            "consist_of": ["sadness", "anticipation"],
            "jp_name": "悲観"
        },
        "contempt": {
            "consist_of": ["disgust", "anger"],
            "jp_name": "軽蔑"
        },
        "cynicism": {
            "consist_of": ["disgust", "anticipation"],
            "jp_name": "皮肉"
        },
        "morbidness": {
            "consist_of": ["disgust", "joy"],
            "jp_name": "不健全"
        },
        "aggressiveness": {
            "consist_of": ["anger", "anticipation"],
            "jp_name": "攻撃"
        },
        "pride": {
            "consist_of": ["anger", "joy"],
            "jp_name": "自尊心"
        },
        "dominance": {
            "consist_of": ["anger", "trust"],
            "jp_name": "優越"
        }
    }
};

//感情データの読み込み
const positive_emotions_relations = getCsv("test_rule_count_positive_th5.csv");
const negative_emotions_relations = getCsv("test_rule_count_negative_th5.csv");


//プロット部の初期設定
let nodes_of_plot = new vis.DataSet([{
    id: 1,
    label: 'Theme',
    level: 0,
    type: 'theme'
},
    {
        id: 2,
        label: 'Introduction',
        level: 1,
        type: 'Basic_structure'
    },
    {
        id: 3,
        label: 'Development',
        level: 1,
        type: 'Basic_structure'
    },
    {
        id: 4,
        label: 'Turn',
        level: 1,
        type: 'Basic_structure'
    },
    {
        id: 5,
        label: 'Conclusion',
        level: 1,
        type: 'Basic_structure'
    }
]);


// create an array with edges
let edges_of_plot = new vis.DataSet([{
    from: 1,
    to: 3
},
    {
        from: 1,
        to: 2
    },
    {
        from: 1,
        to: 4
    },
    {
        from: 1,
        to: 5
    },
]);


//setting of trial map
let nodes_of_trial = new vis.DataSet([
    // { id: 1, label: 'イベント1\nなにがおこるか', level: 0, group: 'event', color: 'orange' },
    // { id: 2, label: 'state1\n時間\n場所\nオブジェクト名\n属性1：属性値1\n属性2：属性値2', level: 1, group: 'state', color: 'lime' },
    // { id: 3, label: 'state2', level: 1, group: 'state', color: 'lime' }
]);


// create an array with edges
let edges_of_trial = new vis.DataSet([{
    // from: 1,
    // to: 3
},

]);

let global_setting;

//ログ用クラス
class Log{
    constructor() {
        this.log_data=[];
    }

    add_log(comment){
        //現状のログを整形する。
        let added_log={};
        //現在秒の取得とログデータへの格納
        added_log.time =　Math.floor((new Date()).getTime() / 1000);
        //初期設定データの格納
        added_log.global_setting = global_setting;
        //登場人物データの格納
        added_log.characters_setting = emotional_setting.characters;

        //マップデータの格納
        added_log.plot_nodes=nodes_of_plot.get();
        added_log.plot_edges=edges_of_plot.get();

        added_log.trial_nodes = nodes_of_trial.get();
        added_log.trial_edgs = edges_of_trial.get();

        //コメントデータの追加
        added_log.comment = comment;

        this.log_data.push(added_log);
    }
}

//グルーバル設定の構造体
class Global_setting {
    constructor(cond, conc, reder) {
        this.theme_condition = cond;
        this.theme_conclusion = conc;
        this.reader_type = reder;
    }
}

class State {
    constructor(name) {
        this.name = name;
        this.time = undefined;
        this.place = undefined;
        this.objects = {};
        this.type = 'state';
        this.group = 'state';
    }

    generate_text() {
        let obj_text = (this.name === undefined ? '' : this.name) + '\n時間:' + (this.time === undefined ? '未定義' : this.time) + '\n場所:' + (this.place === undefined ? '未定義' : this.place);
        let key_array = Object.keys(this.objects);
        for (let i = 0; i < key_array.length; i++) {
            obj_text += '\n' + key_array[i];
            let attribute_keys = Object.keys(this.objects[key_array[i]]);
            for (let j = 0; j < attribute_keys.length; j++) {
                obj_text += '\n' + attribute_keys[j] + '：';
                obj_text += (this.objects[key_array[i]][attribute_keys[j]] === undefined) ? '未定義' : this.objects[key_array[i]][attribute_keys[j]];
            }
        }

        console.log(obj_text);
        return obj_text;
        // return 

    }

    static generate_texts(instance) {
        let obj_text = (instance.name === undefined ? '' : instance.name) + '\n時間:' + (instance.time === undefined ? '未定義' : instance.time) + '\n場所:' + (instance.place === undefined ? '未定義' : instance.place);
        let key_array = Object.keys(instance.objects);
        for (let i = 0; i < key_array.length; i++) {
            obj_text += '\n' + key_array[i];
            let attribute_keys = Object.keys(instance.objects[key_array[i]]);
            for (let j = 0; j < attribute_keys.length; j++) {
                obj_text += '\n' + attribute_keys[j] + '：';
                obj_text += (instance.objects[key_array[i]][attribute_keys[j]] === undefined) ? '未定義' : instance.objects[key_array[i]][attribute_keys[j]];
            }
        }

        console.log(obj_text);
        return obj_text;


    }
}

class Event {
    constructor(name) {
        this.name = name;
        this.type = 'event';
        this.content = undefined;
        this.group = 'event';
    }

    generate_text() {
        return (this.content);
    }

    static generate_texts(instance) {
        return (instance.content);
    }
}

class Scene extends State {
    constructor(name) {
        super(name);
        this.condition_types = ['同じスロットを持つ', 'ゴール状態となる', '包含関係になる']
        this.condition = undefined;
    }

    generate_text() {
        if (this.condition === undefined)
            return undefined;
        let label_text = '条件：' + this.condition_types[this.condition] === undefined ? '未定義' : this.condition_types[this.condition] + '\n';
        label_text += super.generate_text();
        return label_text;
    }
}

//prepare log data

let log_data = new Log();

// create a network
let plot_container = document.getElementById('plot_container');
let plot = {
    nodes: nodes_of_plot,
    edges: edges_of_plot
};
let plot_options = {
    nodes: {
        shape: 'box'
    },
    layout: {
        hierarchical: {
            direction: 'LR'
        }
    }

};

// create a network
let trial_container = document.getElementById('trial_container');
let trial_data = {
    nodes: nodes_of_trial,
    edges: edges_of_trial
};
let trial_options = {
    nodes: {
        shape: 'box',
        font: {
            multi: true
        }
    },
    edges: {
        arrows: {
            to: {
                enabled: true,
                type: 'arrow'
            }
        }

    },
    interaction: {
        navigationButtons: true,
    },
    manipulation: {
        addEdge: function (edgedata, callback) {
            let tonNode = nodes_of_trial.get(edgedata.to);
            let fromNode = nodes_of_trial.get(edgedata.from);
            // let edges = edges_of_trial.get();

            //    同じエッジがあれば排除する
            let duplicated_edges = edges_of_trial.get({
                filter: function (item) {
                    return (item.to === edgedata.to && item.from === edgedata.from);
                }
            })
            if (duplicated_edges.length !== 0) {
                alert('同じ接続を複数作る事はできません');
                return;
            }

            //相互参照も引っかける
            let inter_loop_edges = edges_of_trial.get({
                filter: function (item) {
                    return (item.to === edgedata.from && item.from === edgedata.to);
                }
            })

            if (inter_loop_edges.length !== 0) {
                alert('相互のループを作る事はできません');
                return;
            }



            //コンクルから後ろに付けようとした時もはねる

            if(fromNode.name==='conclusion'){
                alert('Conclusion（結）から後ろに時系列を作ることはできません')
                return;
            }


            console.log(tonNode.group);
            if (tonNode.group === 'event' && fromNode.group === 'state')
                callback(edgedata);
            if (tonNode.group === 'state' && fromNode.group === 'event')
                callback(edgedata);


        },
        addNode: function (nodedata, callback) {

            let new_node
            // if(document.getElementById('add_node').showModal()=='event'){
            //     new_node = new Event(undefined);
            // }
            // else
            // {
            //     new_node = new State(undefined);
            // }
            if (confirm('イベントを作成する場合「はい」を状態を作成する場合は「キャンセル」をクリックしてください')) {
                new_node = new Event(undefined)
                document.getElementById('new_event').showModal();
                return;
            } else {
                new_node = new State(undefined);
                // document.getElementById('new_state').showModal();
            }
            new_node.id = nodedata.id;
            new_node.x = nodedata.x;
            new_node.y = nodedata.y;
            new_node.label = new_node.generate_text();
            callback(new_node);

        },
        deleteNode: function (nodedata, callback) {
            //消せないノードが選択されてた時ははねる。
            let selected_nodes_data = nodes_of_trial.get(nodedata.nodes);
            for (let i = 0; i < selected_nodes_data.length; i++) {
                if (selected_nodes_data[i].name === 'introduction') {
                    callback();
                    return;
                }
                if (selected_nodes_data[i].name === 'development') {
                    callback();
                    return;
                }
                if (selected_nodes_data[i].name === 'turn') {
                    callback();
                    return;
                }
                if (selected_nodes_data[i].name === 'conclusion') {
                    callback();
                    return;
                }
                if (selected_nodes_data[i].name === 'テーマの条件部') {
                    callback();
                    return;
                }
            }
            //上の条件を全部スルーできたらとりあえず普通にコールバック呼んでおく
            callback(nodedata);

        }
    }
};

let plot_tree;
let trial_map;
let chartdemo;

global_setting = new Global_setting(undefined, undefined, 1);

const data_of_chart = [
    [1, 2, 3, 4],
    [4, 3, 2, 1],
    [1, 4, 4, 1],
    [4, 1, 1, 4],
    [4, 1, 4, 1],
    [1, 4, 1, 4]
];

// var global_setting;
var ctx;

//モーダルダイアログの表示
const activateTemplate = () => {
    // 1. templateコンテンツを取得
    const templateModal = document.getElementById('global_setting');
    const content = templateModal.content;

    // 2. 複製
    const clone = document.importNode(content, true); // 第2引数はtrueにする（子ノードまで複製）

    // 4. 挿入
    document.getElementById('global_container').appendChild(clone);
    ctx = document.getElementById('chart_demo').getContext('2d');
    chartdemo = new Chart(ctx, {
        type: 'line',
        data: {
            // labels: ["起", "承", "転", "結"],

            labels: ["Introduction", "Development", "Turn", "Conclusion"],
            datasets: [{
                // label: "感情曲線",
                label: "Story arc",
                borderColor: 'rgb(255, 0, 0)',
                data: data_of_chart[0],
            },]
        },
        options: {
            responsive: false,
            scales: {
                yAxes: [{
                    display: false, //軸の数字を消しました
                    ticks: {
                        max: 5,
                        min: 0,
                        stepSize: 1
                    }
                }]
            },
            legend: {
                display: false
            }
        }
    });


    let global_setting_curve = new Vue({
        el: '#curve_select',
        data: {},
        methods: {
            change: function (event) {
                // let num = $('#curve_select').find('> option:selected').val();
                let num = event.target.value;
                chartdemo.data.datasets[0].data = data_of_chart[num - 1];
                //emotion_data.reader_curve = num - 1;

                chartdemo.update();

            }

        }
    })


    let global_setting_ok = new Vue({
        el: '#global_ok',
        data: {},
        methods: {
            start: function () {

                plot_tree = new vis.Network(plot_container, plot, plot_options);
                trial_map = new vis.Network(trial_container, trial_data, trial_options);
                trial_map.on('selectNode', function (params) {
                    console.log('Select_fired');
                    //トライアルマップでノードが選択された時にする動作
                    // どの質問ボタンを表示するか
                    let selected_nodeid = params.nodes[0];
                    let item = nodes_of_trial.get(selected_nodeid);
                    if (item.type === 'event') {
                        let questions = Object.keys(give_qiestions.questions_and_methods);
                        for (let i = 0; i < questions.length; i++) {
                            give_qiestions.questions_and_methods[questions[i]].display = false;
                        }
                        give_qiestions.questions_and_methods.then_what.display = true;
                        give_qiestions.questions_and_methods.why_previous.display = true;

                    } else if (item.type === 'state') {
                        //どの質問項目を有効化、無効化するのか
                        let questions = Object.keys(give_qiestions.questions_and_methods);
                        for (let i = 0; i < questions.length; i++) {
                            give_qiestions.questions_and_methods[questions[i]].display = false;
                        }
                        //ノードが起承転結のどれかに応じて表示する質問を変更


                        give_qiestions.questions_and_methods.next_event.display = true;
                        give_qiestions.questions_and_methods.previous_event.display = true;

                        //もしも結ならそれ以降のイベントを発想させる質問を与えない。
                        if(name in item){
                            if(item.name==='conclusion')
                                give_qiestions.questions_and_methods.next_event.display = false;
                        }

                        if (item.name==='introduction'||item.name==='development'||item.name==='turn'||item.name==='conclusion'){
                            state_editor.current_data = undefined;
                        }
                        else{
                            //編集不可ではないノードを選択したときは、ノードの中身を変更できるようにする。
                            give_qiestions.questions_and_methods.when.display = true;
                            give_qiestions.questions_and_methods.where.display = true;
                            give_qiestions.questions_and_methods.other_chara.display = true;
                            give_qiestions.questions_and_methods.other_onject.display = true;
                            give_qiestions.questions_and_methods.what_state.display = true;
                            //質問によらずに直接編集する画面に内容を放り込む
                            state_editor.current_data = item;
                        }
                    }

                });
                // トライアルでノード選択が解除された時に走るイベント（全部の選択肢と回答フォームを非表示に）
                trial_map.on('click', function (params) {
                    if(params.nodes.length===0) {
                        console.log('fire_no');
                        let questions = Object.keys(give_qiestions.questions_and_methods);
                        for (let i = 0; i < questions.length; i++) {
                            give_qiestions.questions_and_methods[questions[i]].display = false;
                        }
                        give_qiestions.showing_form = 'none';
                    }
                    //params.event(params);
                });


                //入力された初期設定を基にオブジェクト造って、最初の質問をする。
                let condition_theme = $('#theme_condition').val();
                let theme_conclusion = $('#theme_conclusion').val();
                let num = event.target.value = $('#curve_select').find('> option:selected').val();

                global_setting = new Global_setting(condition_theme, theme_conclusion, num);
                setting_final_attribute.theme_conclusion = global_setting.theme_conclusion;
                emotional_setting.story_arc = num - 1;

                // プロット部のルートノードの更新
                nodes_of_plot.update(
                    {
                        id: 1,
                        label: global_setting.theme_condition + 'すると' + global_setting.theme_conclusion + 'なる',
                        level: 0,
                        type: 'theme'
                    }
                );

                // console.log(global_setting);
                $('.modal-content').hide();
                $('.modal-background').hide();
                setting_final_attribute['display'] = true;

                //add_log

                log_data.add_log("グローバルセッティングが設定されました。");
                // console.log(log_data);

            }
        }
    })
}

activateTemplate();


let setting_final_attribute = new Vue({
    el: '#setting_final_attribute',
    data: function () {
        return {
            theme_conclusion: global_setting.theme_conclusion,
            display: false,
            attribute: '',
            value: ''
        }
    },
    methods: {
        ok: function () {

            this.display = false;
            setting_final_state_character.attribute = this.attribute;
            setting_final_state_character.value = this.value;
            setting_final_state_character.display = true;

            //ログデータの追加
            log_data.add_log("最終状態が設定されました");
            // console.log(log_data);


        }
    }
})

let setting_final_state_character = new Vue({
    el: '#setting_final_state_character',
    data: function () {
        return {
            display: false,
            attribute: '',
            value: '',
            character: ''
        }
    },
    methods: {
        ok: function () {


            this.display = false;
            emotional_setting.characters.push({
                id: 0,
                name: this.character,
                introduction: '',
                development: '',
                turn: '',
                conclusion: '',
                represent_theme: true,
            });

            emotional_setting.display = true;

            //ログデータの追加
            log_data.add_log("テーマを表現する登場人物が設定されました");
            // console.log(log_data);

        }
    }
});

let emotional_setting = new Vue({
    el: '#emotional_setting',
    data: function () {
        return {
            display: false,
            emotions: all_emotions,
            empathized: undefined,
            characters: [],
            story_arc_src: [
                'img/story_arc/1.png',
                'img/story_arc/2.png',
                'img/story_arc/3.png',
                'img/story_arc/4.png',
                'img/story_arc/5.png',
                'img/story_arc/6.png',
            ],
            story_arc: 1,

        }
    },
    computed: {
        next_step_check: function () {
            //ここOKボタンをアクティブにするかどうかをチェックする。

            for (let i = 0; i < this.characters.length; i++) {
                if (this.characters[i].introduction === '')
                    return false
                else if (this.characters[i].development === '')
                    return false
                else if (this.characters[i].turn === '')
                    return false
                else if (this.characters[i].conclusion === '')
                    return false
                else if (this.characters[i].name === '')
                    return false
            }

            return this.empathized !== undefined;

        }
    },

    methods: {
        add_character: function () {
            this.characters.push({
                id: this.characters[this.characters.length - 1].id + 1,
                name: '',
                introduction: '',
                development: '',
                turn: '',
                conclusion: '',
                represent_theme: false,

            });

        },
        del_character: function (id) {
            if (id != 0)
                this.characters.splice(this.characters.findIndex(item => item.id == id), 1);

        },
        check_emotion: function () {
            //感情のフィードバック生成するコールバック
            generate_emotion_feedback();
        },
        ok: function () {
            //ここで初期状態（発想部の）を作る？
            // ここで作成するのは、起承転結の感情が入った状態。あと最終状態に関しては、その状態を示すスロットが入った状態
            // あと、テーマの条件部から発想されるイベントが必要ってことね

            // 追加するデータ群
            let states = [];
            let scenes = [];

            // 新しいアレを作成
            for (let i = 0; i < 4; i++) {
                let section;
                switch (i) {
                    case 0:
                        section = 'introduction';

                        break;
                    case 1:
                        section = 'development';

                        break;
                    case 2:
                        section = 'turn';

                        break;
                    case 3:
                        section = 'conclusion';
                        break;
                }
                states.push(new State(section));
                scenes.push(new Scene(section));

                for (let j = 0; j < this.characters.length; j++) {
                    states[i].objects[this.characters[j].name] = {
                        感情: emo_to_jpname(this.characters[j][section])
                    };
                    scenes[i].objects[this.characters[j].name] = {
                        感情: emo_to_jpname(this.characters[j][section])
                    };

                    if (section == 'conclusion' && this.characters[j].represent_theme == true) {
                        states[i].objects[this.characters[j].name][setting_final_attribute.attribute] = setting_final_attribute.value;
                        scenes[i].objects[this.characters[j].name][setting_final_attribute.attribute] = setting_final_attribute.value;
                    }
                }

                states[i].label = states[i].generate_text();
                states[i].color = 'steelblue';

                scenes[i].condition = 1;
                scenes[i].level = 1;
                scenes[i].id = i + 2;
                scenes[i].y = i;
                scenes[i].label = scenes[i].generate_text();

            }

            // トライアル部の初期ノードを放り込む
            // 状態
            nodes_of_trial.add(states);
            // イベント
            let initial_event = new Event('テーマの条件部');
            initial_event.content = global_setting.theme_condition;
            initial_event.label = initial_event.generate_text();
            initial_event.color='gold';


            nodes_of_trial.add(initial_event);

            // プロット部の起承転結にゴール状態を放り込む
            nodes_of_plot.update(scenes);

            //最終状態ノードの追加
            this.display = false;
            give_qiestions.display = true;
            state_editor.display=true;
            plot_extraction.display = true;

            //ログデータの追加
            log_data.add_log("登場人物の感情が設定されました");
            // console.log(log_data);

        }
    }
});


let edit_mode = new Vue({
    el:"#edit_type",
    data:function () {
      return{
          mode:false        //一応質問モードをONにする時にtrueで
      }
    },
    methods:{
        chan:function () {

            give_qiestions.mode=this.mode;
            state_editor.mode=this.mode;
        }
    }
});

let state_editor = new Vue({
    el:'#edit_state',
    data:function (){
        return{
            display:false,
            mode:false,
            current_data:{
               // これはサンプルデータ
                // objects:{
                //         "主人公":{
                //             "性別":"男",
                //             "年齢":"大学生"
                //         },
                //     "heroin": {
                //         "age": "teen",
                //         "sex": "female"
                //     }
                // }
            }//selectedのときに状態なら入れるようにしてみた。どうなるかなぁ……
        }
    },
    methods:{
        add_object:function () {
            this.current_data.objects[""]="";
        },
        del_object:function (obj) {
            delete this.current_data.objects[obj];
        },
        add_attribute:function(obj) {
            this.current_data.objects[obj][""] = "";
        },
        del_attribute:function (obj,attr) {
            delete this.current_data.objects[obj][attr];
        },

        update:function () {
            //ノードの更新をどうにかする関数。たぶんここに入ってるcurrent_dataを用いてtiral_nodesをアップデートすれば行けるはず。たぶん。
            this.current_data.label = this.current_data.generate_text();

            nodes_of_trial.update(this.current_data);

            log_data.add_log("状態ノードを更新しました");

        }
    }

});



let give_qiestions = new Vue({
    el: '#give_questions',
    data: function () {
        return {
            display: false,
            mode:false,
            questions_and_methods: {
                when: {
                    question: 'いつのこと？',
                    display: false,
                    type: 'single',
                    action: 'update'
                },
                where: {
                    question: 'どこのこと？',
                    display: false,
                    type: 'single',
                    action: 'update'
                },
                other_chara: {
                    question: 'ほかに誰がでてくる？',
                    display: false,
                    type: 'single',
                    action: 'update'
                },
                other_onject: {
                    question: 'ここで何に注目する？',
                    display: false,
                    type: 'single',
                    action: 'update'
                },
                what_state: {
                    question: 'どんな状態だろう？',
                    display: false,
                    type: 'triple',
                    action: 'update'
                },
                then_what: {
                    question: 'このあとどうなる？',
                    display: false,
                    type: 'triple',
                    action: 'generate',
                    edge_direction: 'next',
                    next_type: 'state'
                },
                why_previous: {
                    question: 'なぜおこった？',
                    display: false,
                    type: 'triple',
                    action: 'generate',
                    edge_direction: 'previous',
                    next_type: 'state'
                },
                next_event: {
                    question: 'つぎに何がおこる？',
                    display: false,
                    type: 'single',
                    action: 'generate',
                    edge_direction: 'next',
                    next_type: 'event'
                },
                previous_event: {
                    question: 'なにが起っていた？',
                    display: false,
                    type: 'single',
                    action: 'generate',
                    edge_direction: 'previous',
                    next_type: 'event'
                }

            },
            showing_form: 'none',
            inputs_data: {
                single: '',
                triple: ['', '', '']
            }
        }
    },
    // computed: {
    //   show_question:function (){
    //       return trial_map.getSelectedNodes() !== [];
    //   }
    //
    // },
    methods: {
        question_button_click: function (name) {
            this.showing_form = name
        },
        answering: function () {
            // 選択されているノードIDの取得
            let nodes = trial_map.getSelectedNodes();
            //選択されているノードのデータ取得
            let update_node = nodes_of_trial.get(nodes[0]);
            let new_node;


            if (this.questions_and_methods[this.showing_form].action === 'generate') {
                //新しいノードとリンクの生成
                //ノードの生成(イベントと状態で分ける)
                if (this.questions_and_methods[this.showing_form].next_type === 'event') {
                    new_node = new Event(undefined);
                    new_node.content = this.inputs_data.single;
                    new_node.label = this.inputs_data.single;
                    new_node = nodes_of_trial.add(new_node);
                } else {
                    new_node = new State(undefined);
                    new_node.objects[this.inputs_data.triple[0]] = {};
                    new_node.objects[this.inputs_data.triple[0]][this.inputs_data.triple[1]] = this.inputs_data.triple[2];
                    new_node.label = new_node.generate_text();
                    new_node = nodes_of_trial.add(new_node);
                }
                // エッジの生成（ただし、方向を考える必要あり

                if (this.questions_and_methods[this.showing_form].edge_direction === 'next')
                    // toが造ったノード
                    edges_of_trial.add({
                        from: nodes[0],
                        to: new_node[0]
                    });

                else
                    //fromが造ったノード
                    edges_of_trial.add({
                        from: new_node[0],
                        to: nodes[0]
                    });
            } else {
                // 既存のノードのアップデート
                //アップデートした同じIDの情報を用意する
                switch (this.showing_form) {
                    case 'when':
                        update_node.time = this.inputs_data.single;
                        break;

                    case 'where':
                        update_node.place = this.inputs_data.single;
                        break;
                    case 'other_chara':
                        update_node.objects[this.inputs_data.single] = {};
                        break;
                    case 'other_onject':
                        update_node.objects[this.inputs_data.single] = {};
                        break;
                    default:
                        if (update_node.objects.hasOwnProperty(this.inputs_data.triple[0]))
                            update_node.objects[this.inputs_data.triple[0]][this.inputs_data.triple[1]] = this.inputs_data.triple[2];
                        else
                            update_node.objects[this.inputs_data.triple[0]] = {
                                [this.inputs_data.triple[1]]: this.inputs_data.triple[2]
                            }
                        break;
                }
                console.log(update_node);
                if (update_node.type === 'state')
                    update_node.label = State.generate_texts(update_node);
                else
                    update_node.label = Event.generate_texts(update_node);
                nodes_of_trial.update(update_node);
            }
            this.inputs_data.single = '';
            this.inputs_data.triple = ['', '', ''];

            //ログデータの追加
            log_data.add_log("質問に回答しました")
            // console.log(log_data);
        },
    }
});

// ちょっとしたテスト
let add_new_event = new Vue({
    el: '#new_event',
    data: function () {
        return {
            content: ''
        }
    },
    methods: {
        ok_click: function () {
            add_node = new Event('');
            add_node.content = this.content;
            add_node.label = add_node.generate_text();
            nodes_of_trial.add(add_node);
            document.getElementById('new_event').close();
            this.content = '';
        }
    }

});

let plot_extraction = new Vue({
    el: '#plot_extraction',
    data: function () {
        return ({
            extract_mode: false,
            routes_ids: [],
            detailed_routes: [],
            current_route: 0,
            select_section: undefined,
            current_trial_nodes: undefined,
            switched_button_message: 'プロット抽出',
            display: false
        })
    },
    methods: {
        extract_click: function () {

            if (this.extract_mode) {
                this.extract_mode = false;
                give_qiestions.display = true;
                state_editor.display=true;
                nodes_of_trial.update(this.current_trial_nodes.get());
                this.switched_button_message = 'プロット抽出モード';
                //ログデータの追加
                log_data.add_log("プロット抽出モードが終了");
                // console.log(log_data);

                //質問ボタンの非表示化と抽出関連の表示
                give_qiestions.display=true;
                state_editor.display=true;

                //トライアル部のマニピュレをONに
                trial_map.setOptions(trial_options);

                return
            }

            this.extract_mode = true;
            give_qiestions.display = false;
            state_editor.display=false;
            this.switched_button_message = 'プロット抽出モード終わり'
            this.current_trial_nodes = new vis.DataSet(nodes_of_trial.get());
            //トライアルノードの操作を禁止する
            trial_map.setOptions({manipulation: false});


            //主人公の情報はここに入ってる
            let chara_express_model;
            let characters_data = emotional_setting.characters;
            for (let i = 0; i < emotional_setting.characters.length; i++) {
                if (characters_data[i].represent_theme === true) {
                    chara_express_model = emotional_setting.characters[i];
                }
            }
            //チェックポイントノードの検索
            let intro = nodes_of_trial.get({
                filter: function (item) {
                    return (item.name === "introduction");
                }
            });
            let develop = nodes_of_trial.get({
                filter: function (item) {
                    return (item.name === "development");
                }
            });
            let turn = nodes_of_trial.get({
                filter: function (item) {
                    return (item.name === "turn");
                }
            });
            let concl = nodes_of_trial.get({
                filter: function (item) {
                    return (item.name === "conclusion");
                }
            });

            let expand_target = 0;
            let child_candidates;
            let start;
            let goal;
            let edge_white_tree = []
            this.routes_ids = [];

            let com;//ログのコメント保持用
            //まず、イントロからデベロップメントを検索してみる
            //セレクトボックスの内容から必要な部分を設定。
            switch (this.select_section) {
                case '0':
                    //ここ、イントロまでの動作なんでちょっと変更する必要あり
                    start = undefined;
                    goal = intro[0];
                    com = "introまで抽出"
                    break;
                case '1':
                    start = intro[0];
                    goal = develop[0];
                    com = "developmentまで抽出"

                    break;
                case '2':
                    start = develop[0];
                    goal = turn[0];
                    com = "turnまで抽出"
                    break;
                case '3':
                    start = turn[0];
                    goal = concl[0];
                    com = "conclusionまで抽出"
                    break;
            }

            if (this.select_section === '0') {
                //イントロまでが選択された時。ルートノードにイントロを突っ込む
                edge_white_tree.push({
                    parent: undefined,
                    node: goal.id
                });


                //展開対象がある間繰り返し
                while (expand_target !== edge_white_tree.length) {
                    //子供の候補となるのは、展開対象がエッジの先に付いている元ノード
                    child_candidates = edges_of_trial.get({
                        filter: function (item) {
                            return (item.to === edge_white_tree[expand_target].node)
                        }
                    });
                    //子供の候補を全部回す
                    child_candidates.forEach(item => {
                        let can_be_add = true;
                        let node_content = nodes_of_trial.get(item.from);

                        //子供の候補が基本構造なら追加しない
                        if('name' in node_content){
                            if(node_content.name==="introduction"||node_content.name==="development"||node_content.name==="turn"||node_content.name==="conclusion")
                                can_be_add=false;
                        }

                        //展開対象までに至った経路の中で子供の候補が出てなければ追加可能
                        if(can_be_add===true){
                            for (let checker = expand_target; checker !== 0; checker = edge_white_tree[checker].parent) {
                                if (edge_white_tree[checker].node === item.from) {
                                    can_be_add = false;
                                }
                            }
                        }
                        if (can_be_add) {
                            edge_white_tree.push({
                                parent: expand_target,
                                node: item.from
                            });
                        }
                    });
                    expand_target++;
                }

                //    ここまででルート木が完成しているので、あとはなんとかする　

                let leaf_nodes = edge_white_tree.filter(function (item, num) {
                    let checker = edge_white_tree.find(item2 => item2.parent === num);
                    return checker === undefined;
                });

                //葉ノードが抽出されたので、後は親を辿ってルートに突っ込む
                for (let i = 0; i < leaf_nodes.length; i++) {
                    let current_node = leaf_nodes[i];
                    let target_index = leaf_nodes[i].parent;
                    let route = [leaf_nodes[i].node];

                    while (target_index !== undefined) {
                        route.push(edge_white_tree[target_index].node);
                        target_index = edge_white_tree[target_index].parent;
                    }
                    this.routes_ids.push(route);
                }
            } else {
                //
                // スタートをルートノードとして突っ込む(これは0番目の要素)
                edge_white_tree.push({
                    parent: undefined,
                    node: start.id
                })
                while (expand_target != edge_white_tree.length) {

                    // 展開して接続先を取得
                    child_candidates = edges_of_trial.get({
                        filter: function (item) {
                            return (item.from == edge_white_tree[expand_target].node)
                        }
                    });
                    child_candidates.forEach(item => {
                        //ループチェック
                        let can_be_add = true;
                        for (let checker = expand_target; checker != 0; checker = edge_white_tree[checker].parent) {
                            if (edge_white_tree[checker].node === item.to)
                                can_be_add = false;
                        }
                        if (can_be_add) {
                            //現時点では、ゴールノードに到達したか否かをチェックしてないので、順方向ループ無しでたどれる所全部辿って木に入れてるな、ルート取り出しの時に厳選してるけど、これマップが大きくなったらすごい事になりそう……
                            edge_white_tree.push({
                                parent: expand_target,
                                node: item.to
                            });
                        }
                    });
                    expand_target++;
                }
                console.log(edge_white_tree);
                let end_and_goal = edge_white_tree.filter(item => item.node === goal.id)
                this.routes_ids = [];
                end_and_goal.forEach(item => {
                    let route = [item.node];
                    let target_index = item.parent;
                    while (target_index !== undefined) {
                        route.push(edge_white_tree[target_index].node);
                        target_index = edge_white_tree[target_index].parent;
                    }
                    //配列の順番がゴールからになってるから反転させる
                    route.reverse();
                    this.routes_ids.push(route);
                    console.log(nodes_of_trial.get(route));
                });


                give_qiestions.display=false;
                state_editor.display=false;
                log_data.add_log(com);
            }

            this.route_preview();
            //データの用意
            // this.routes_ids.forEach(r =>{
            //
            //     r.forEach(node=>{
            //         let detailed_node = nodes_of_trial.get(node);
            //     })
            // })


        },
        route_select: function () {
            let added_node_ids = this.routes_ids[this.current_route];
            let added_nodes = this.current_trial_nodes.get(added_node_ids);
            let parent_node_id = undefined;

            for (let i = 0; i < added_nodes.length; i++) {
                added_nodes[i].level = 2;
                //ここであと、高さの調整が必要かも……
            }
            //とりあえずノードを突っ込む
            added_nodes.shift();

            if (nodes_of_plot.get(added_node_ids)===null){
                log_data.add_log('プロット挿入失敗');
                alert('既にプロットにあるイベントor状態を新たに追加できません');
                return;

            }
            nodes_of_plot.add(added_nodes);

            //親となるノードを探索
            switch (this.select_section) {
                case '0':
                    parent_node_id = 2;
                    break;
                case '1':
                    parent_node_id = 3;
                    break;
                case '2':
                    parent_node_id = 4;

                    break;
                case '3':
                    parent_node_id = 5;
                    break;
            }

            //エッジを追加する
            let add_edges = [];
            for (let i = 0; i < added_node_ids.length; i++) {
                add_edges.push({
                    from: parent_node_id,
                    to: added_node_ids[i],
                });
            }

            edges_of_plot.add(add_edges);
            log_data.add_log("プロット挿入");
        },

        /**
         * 部分プロットを削除する機能
         */
        plot_delete: function (){
            let parent_node_id=undefined;
            switch (this.select_section) {
                case '0':
                    parent_node_id = 2;
                    break;
                case '1':
                    parent_node_id = 3;
                    break;
                case '2':
                    parent_node_id = 4;

                    break;
                case '3':
                    parent_node_id = 5;
                    break;
            }

            let deleted_edges = edges_of_plot.get({
                filter:function (item) {
                    return(item.from===parent_node_id);
                }});
            for(let i=0;i<deleted_edges.length;i++){
                edges_of_plot.remove(deleted_edges[i].id);
                nodes_of_plot.remove(deleted_edges[i].to);
            }
            log_data.add_log("部分プロット削除");

        },
        /**
         *実際にルートを考える変数
         */
        route_preview: function () {

            let preview_route = this.routes_ids[this.current_route];
            let preview_nodes = this.current_trial_nodes.get(preview_route);
            nodes_of_trial.clear();
            nodes_of_trial.clear();
            nodes_of_trial.add(preview_nodes);
        },
        /**
         * 前のルートを表示する奴
         */
        previous_route: function () {
            if (this.current_route < this.routes_ids.length - 1) {
                this.current_route++;
            }
            this.route_preview();
        },
        /**
         * 次のルートを表示する奴
         */
        next_route: function () {
            if (this.current_route > 0) {
                this.current_route--;
            }
            this.route_preview();
        },

        /**
         * プロットの整合性をチェックする奴
         */
        plot_check: function (){
            plot_tree.storePositions();
            let nodes = nodes_of_plot.get({
                filter:function (item){
                     return(item.level===2);
                }
            });
            //Yの座標でソート
            nodes.sort(function (a, b) {
                if (a.y < b.y)
                    return -1
                if (a.y > b.y)
                    return 1
                return 0
            });

            //プロット部で上下に並んでいるノードのエッジがトライアル部に存在するかチェック
            for(let i=0;i<nodes.length-1;i++){
                let target_edge = edges_of_trial.get({
                    filter:function (item) {
                        return item.from===nodes[i].id&&item.from===nodes[i+1].id
                    }
                });

                if(target_edge===null){
                    trial_map.selectNodes([nodes[i].id,nodes[i+1].id])
                    log_data.add_log('プロットチェックで矛盾検出');
                    alert('トライアル部で接続のないプロット上での繋がりが見つかりました。接続がない二つのノードがトライアル部で選択されています');
                    return;
                }
                let target_node = nodes_of_plot.get({
                    filter:function (item) {
                        return item.name==='テーマの条件部'
                    }
                });
                if (target_node===null){
                    log_data.add_log('条件イベント不備');
                    alert('重要なイベントがプロットにありません');
                    return;
                }

                log_data.add_log('プロットチェックで矛盾非検出');
                alert('矛盾は見つかりませんでした');
            }
        }
    }
})


// let add_new_state = new Vue({
//     el: '#new_state',
//     data: function () {
//         return {
//             time: undefined,
//             place: undefined,
//             objects: [{
//                     meta_name:'名前だよ',
//                     属性: '値'

//             }]
//         }
//     },
//     methods: {
//         add_object: function () {
//             this.objects.push({ meta_name:"あたらしいオブジェクト",  '属性': '値'  })

//         },
//         add_attribute: function (key) {
//             this.objects[key].push({'新しい属性' : ''});
//         },
//         ok_click: function () {
//             add_node = new Event('');
//             add_node.content = this.content;
//             add_node.label = add_node.generate_text();
//             nodes_of_trial.add(add_node);
//             document.getElementById('new_event').close();
//         }
//     }

// });


//感情を受け取って各区間の遷移を返す奴。
function calc_emotional_up_down(intro, dev, turn, conc) {

    return ({
        introduction_to_development: '',
        development_to_turn: '',
        turn_to_conclusion: ''
    })
}

function generate_emotion_feedback() {

    //あらかじめ感情曲線のデータを持っておく必要あり
    let emotional_curve = data_of_chart[global_setting.reader_type - 1];
    let emotional_up_down = []; //感情曲線の増減を持ってる変数
    let have_problem = false; //フィードバックが必要か否か
    let characters_data = emotional_setting.characters;
    let feedback_message = '';

    // 感情曲線の傾きを算出してる所
    for (let i = 0; i < 3; i++) {
        if (emotional_curve[i] === emotional_curve[i + 1])
            emotional_up_down[i] = "nan";
        else if (emotional_curve[i] > emotional_curve[i + 1])
            emotional_up_down[i] = "down";
        else if (emotional_curve[i] < emotional_curve[i + 1])
            emotional_up_down[i] = "up";
    }

    for (let i = 0; i < characters_data.length; i++) {
        let check_emotions = [characters_data[i].introduction, characters_data[i].development, characters_data[i].turn, characters_data[i].conclusion]

        for (let j = 0; j < 3; j++) {
            if (!characters_data[i].name === emotional_setting.empathized)
                break;

            let before = check_emotions[j];
            let after = check_emotions[j + 1];
            let grad = 'nan';
            let before_jp;
            let after_jp;
            let before_group = "negative";
            let after_group = "negative";


            let matched_basic = false;
            //before側の日本語名を取ってくる
            matched_basic = all_emotions.basics.hasOwnProperty(before);
            if (matched_basic)
                before_jp = all_emotions.basics[before].jp_name;
            else
                before_jp = all_emotions.dyads[before].jp_name;

            //after側の日本語名を取ってくる
            matched_basic = all_emotions.basics.hasOwnProperty(after);
            if (matched_basic)
                after_jp = all_emotions.basics[after].jp_name;
            else
                after_jp = all_emotions.dyads[after].jp_name;

            for (let i in positive_emotions_relations) {
                if (positive_emotions_relations[i][0] === before_jp)
                    before_group = "positive";
                if (positive_emotions_relations[i][0] === after_jp)
                    after_group = "positive";
            }

            //そもそも見るべき表が違う場合（二分割のグループが違う）
            if (before_group !== after_group) {

                if (before_group == 'positive')
                    grad = 'down';
                else
                    grad = 'up';
            }
            //同一グループ内での判定
            else {
                //ポジティブグループの時
                if (before_group == 'positive') {
                    for (let k = 0; k < positive_emotions_relations.length; k++) {
                        if (positive_emotions_relations[k][0] === before_jp) {
                            for (let l = 0; l < positive_emotions_relations.length; l++) {
                                if (positive_emotions_relations[0][l] === after_jp) {
                                    if (positive_emotions_relations[k][l] === 1) {
                                        grad = 'down';
                                    }
                                }
                            }
                        }
                    }
                    for (let k = 0; k < positive_emotions_relations.length; k++) {
                        if (positive_emotions_relations[0][k] === before_jp) {
                            for (let l = 0; l < positive_emotions_relations.length; l++) {
                                if (positive_emotions_relations[l][0] === after_jp) {
                                    if (positive_emotions_relations[l][k] === 1) {
                                        grad = 'up';
                                    }
                                }
                            }
                        }
                    }
                }
                //ネガティブグループの時
                else {
                    for (let k = 0; k < negative_emotions_relations.length; k++) {
                        if (negative_emotions_relations[k][0] === before_jp) {
                            for (let l = 0; l < negative_emotions_relations.length; l++) {
                                if (negative_emotions_relations[0][l] === after_jp) {
                                    if (negative_emotions_relations[k][l] === 1) {
                                        grad = 'up';
                                    }
                                }
                            }
                        }
                    }
                    for (let k = 0; k < negative_emotions_relations.length; k++) {
                        if (negative_emotions_relations[0][k] === before_jp) {
                            for (let l = 0; l < negative_emotions_relations.length; l++) {
                                if (negative_emotions_relations[l][k] === after_jp) {
                                    if (negative_emotions_relations[l][k] === 1) {
                                        grad = 'down';
                                    }
                                }
                            }
                        }
                    }
                }

            }

            const phase = ['起承における', '承転における', '転結における'];
            // const phase = ['Introduction to development:', 'Development to turn:', 'Turn to conclusion:'];
            // 結果表示

            if (emotional_up_down[j] === 'up' && grad === 'down') {
                //  feedback_message+= phase[j] + characters_data[i].name + '\'s emotions do not follow the story arc.';
                feedback_message += phase[j] + characters_data[i].name + 'の感情が曲線と一致しません';
                have_problem = true;
            }
            //console.log(phase[j]+emotion_data.emotions[i].name+'の感情が曲線と一致しません');
            else if (emotional_up_down[j] === 'down' && grad === 'up') {
                // feedback_message+= phase[j] + characters_data[i].name + '\'s emotions do not follow the story arc.';
                feedback_message += phase[j] + characters_data[i].name + 'の感情が曲線と一致しません';
                have_problem = true;
            }
            //  console.log(phase[j]+emotion_data.emotions[i].name+'の感情が曲線と一致しません');
            else
                console.log('nan');
        }

    }
    if (have_problem) {
        alert(feedback_message);
    } else {
        alert('感情設定に矛盾は見つかりませんでした');
    }
    // if(have_problem)
    //     // toastr.warning('診断結果をチェックしてみましょう');
    //     toastr.warning('let check results');
    // else
    //     // toastr.info('感情曲線と感情に相違は見つかりませんでした');
    //     toastr.info('Differences are not found between the story arc and characters\' emotions');


}

function grad_emotion_value(before, after) {
    if (before === after)
        return 'nan';
    else if (before < after)
        return 'up';
    else
        return 'down';
}

function check_part_of_plot() {


}

function emo_to_jpname(eng) {
    let matched_basic = false;
    //before側の日本語名を取ってくる
    matched_basic = all_emotions.basics.hasOwnProperty(eng);
    if (matched_basic)
        return (all_emotions.basics[eng].jp_name);
    else
        return (all_emotions.dyads[eng].jp_name);
}

// 適当にプロット部にぶち込む感じの奴作ってみる？
function plot_insert() {

}

function plot_path_find() {

}


//CSV読み込む奴
function getCsv(url) {
    //CSVファイルを文字列で取得。
    var txt = new XMLHttpRequest();
    txt.open('get', url, false);
    txt.send();

    //改行ごとに配列化
    var arr = txt.responseText.split('\n');

    //1次元配列を2次元配列に変換
    var res = [];
    for (var i = 0; i < arr.length; i++) {
        //空白行が出てきた時点で終了
        if (arr[i] == '') break;

        //","ごとに配列化
        res[i] = arr[i].split(',');

        for (var i2 = 0; i2 < res[i].length; i2++) {
            //数字の場合は「"」を削除
            if (res[i][i2].match(/\-?\d+(.\d+)?(e[\+\-]d+)?/)) {
                res[i][i2] = parseFloat(res[i][i2].replace('"', ''));
            }
        }
    }

    return res;
}

function log_save() {
    //データを取り出して格納（ノードとエッジに関する全てのデータは保存されている、はず……


    let json_text = JSON.stringify(log_data.log_data, undefined, 4);
    let blob = new Blob([json_text], {"type": "application/json"});
    // window.URL = window.URL || window.webkitURL;
    let a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    document.body.appendChild(a);
    a.download='log_data.json';
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(a.href);
}
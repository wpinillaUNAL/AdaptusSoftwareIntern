const tasks= require('./tasks')
const s3_driver = require('./s3_driver')
const retorno = tasks({'s3_driver':s3_driver}).run({'files':[
    '50WC5Y2A4T82FDP6RCT3',
    'N7F65N0T91IYXYMSMOSJ',
    'MMHXFMA6MELL233KJLCZ',
    'NZYXOEJ6L6G57BUH0DNN',
    'XKZ4JCVX5KANJ6GR6IB9',
    'BD510DDLSHYA0TGASKCU',
    'K06GKC0WLZ48JEC8TVP9',
    'SBULXCT3TS0NZTKBRWA7',
    'QZBES7K97OJBAHV408T2',
    'XORINMJ255YR112AGJ8O',
    '6fo19qqtsleialkxfzm8',
    'drf3p35l39or1398wi1v',
    'epugwd8dvuzge8813jkv',
    'mfy3slf6bp1vbotx8d9t',
    'jjdsk8,,?ll.,%44$$)='

], 'scanned_files':[
    'XORINMJ255YR112AGJ8O',
    'K06GKC0WLZ48JEC8TVP9',
    'N7F65N0T91IYXYMSMOSJ',
    'fpvlilx0e40i36skzs6x'

], 'errored_files':[
    'BD510DDLSHYA0TGASKCU',
    'ZZUKOI0D9A71QZR1DEK2',
    'BXIQX8QWRA858K4QQ7PT',
    '1HND77UWCZ27Y2TTW1A0',
    'l9gjcmqy64ch56poygji',
    '6fo19qqtsleialkxfzm8',
    '53o9rjmbx29zaj06xhds'
]})
retorno.then((response)=>{console.log(response)})
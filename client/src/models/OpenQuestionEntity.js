import BaseQuestionEntity from './BaseQuestionEntity';

class OpenQuestionEntity extends BaseQuestionEntity {
    constructor() {
        super();
        this.correctAnswer = '';
    }
}

export default OpenQuestionEntity; 
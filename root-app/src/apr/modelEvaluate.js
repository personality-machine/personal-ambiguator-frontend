import { loadImage } from './utils';

const ModelEvaluate = (src, srcCase, oriArr, {setOriArr}, afterArr, {setAfterArr}, model) => {
      let newArr = [];    
      switch(srcCase){
        case 'original':
          newArr = [...oriArr];
          break;
        case 'after params':
          newArr = [...afterArr];
          break;
        default:
          console.log('unindentified label');
          break;
      }
      

      if (src != null){
        loadImage(src).then(img => model.grad(img)).then((dataUri) => {
          for (let index = 0; index < newArr.length; index++){
            newArr[index].url = dataUri[index];
          }
          switch(srcCase){
            case 'original':
              setOriArr(newArr);
              break;
            case 'after params':
              setAfterArr(newArr);
              break;
            default:
              console.log('unindentified label');
              break;
          }
      });
      }
  };

  export default ModelEvaluate;
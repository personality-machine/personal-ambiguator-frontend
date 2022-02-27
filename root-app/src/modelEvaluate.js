import Gradient from './gradient';

const ModelEvaluate = (src, srcCase, oriArr, {setOriArr}, afterArr, {setAfterArr}) => {
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
        Gradient(src).then((dataUri) => {
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
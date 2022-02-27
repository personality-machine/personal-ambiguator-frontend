import Gradient from './gradient';

const ModelEvaluate = (src, srcCase, index, oriArr, {setOriArr}, afterArr, {setAfterArr}) => {
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
      if (src != null && newArr[index].url === ""){
        Gradient(src, index).then((dataUri) => {
          newArr[index].url = dataUri;
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
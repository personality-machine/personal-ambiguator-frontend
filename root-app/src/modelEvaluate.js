import Gradient from './gradient';

const width = 224;
const height = 224;
var buffer = new Uint8ClampedArray(width * height * 4);
// create off-screen canvas element
var canvas = document.createElement('canvas'),
ctx = canvas.getContext('2d');
canvas.width = width;
canvas.height = height;
// create imageData object
var idata = ctx.createImageData(width, height);
var dataUri = "";

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
        Gradient(src, index).then((arr) => {
          arr = arr[0];
          for (var j = 0; j < height; j++){
            for (var i = 0; i < width; i++){
              var pos = (j * width + i) * 4;
              buffer[pos] = arr[i][j][0]*255; // R
              buffer[pos + 1] = arr[i][j][1]*255; // G
              buffer[pos + 2] = arr[i][j][2]*255; // B
              buffer[pos + 3] = 255; // alpha
            }
          }
          idata.data.set(buffer);
          // update canvas with new data
          ctx.putImageData(idata, 0, 0);
          // produces a PNG file
          dataUri = canvas.toDataURL();
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
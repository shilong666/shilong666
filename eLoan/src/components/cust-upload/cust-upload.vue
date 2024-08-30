<template>
  <view class="flex-wrap">
    <template v-for="(img, index) in imageList">
      <view
        class="upload-box-big"
        v-if="!img.delFlag"
        @click="previewImg(index)"
        :key="index"
      >
        <view
          class="image-box"
          :style="{
            width: `${this.width}rpx`,
            height: `${this.height}rpx`,
            border: `${this.border ? '2rpx solid #D8D8D8' : 'none'}`,
            borderRadius: `${this.borderRadius}rpx`
          }"
        >
          <image :src="img.url" mode="aspectFill" lazy-load></image>
          <view class="delete" @click.stop="deleteImg(index)" v-if="!readonly">
            <u-icon name="close"></u-icon>
          </view>
        </view>
        <view class="upload-box-title" v-if="title">{{ title }}</view>
      </view>
    </template>
    <view
      class="upload-box-big"
      @click="uploadImage"
      v-if="(imageLength < count || count == 0) && !readonly"
    >
      <view
        class="upload-box"
        :style="{
          width: `${this.width}rpx`,
          height: `${this.height}rpx`,
          border: `${this.border ? '2rpx solid #D8D8D8' : 'none'}`,
          borderRadius: `${this.borderRadius}rpx`
        }"
      >
        <view class="upload-bg">
          <slot name="upload-bg"></slot>
        </view>
        <view class="upload-icon">
          <slot name="icon">
            <u-icon name="camera-fill" size="60rpx" color="#D8D8D8"></u-icon>
          </slot>
        </view>
      </view>
      <view class="upload-box-title" v-if="title">{{ title }}</view>
    </view>
  </view>
</template>

<script>
import request from '@/utils/request.js';
export default {
  name: 'Uplaod',
  props: {
    // 上传图片数量 0表示没有限制
    count: {
      type: Number,
      default: 0
    },
    // 上传组件的地步标题 默认没有
    title: {
      type: String,
      default: ''
    },
    // 上传的图片列表 默认为空
    value: {
      default: null
    },
    // images中图片的key
    srcName: {
      type: String,
      default: 'url'
    },
    category: {
      type: String,
      default: ''
    },
    // 文件上传类型
    fileType: {
      type: String,
      default: ''
    },
    readonly: {
      type: Boolean,
      default: () => false
    },
    width: {
      type: Number,
      default: 150
    },
    height: {
      type: Number,
      default: 150
    },
    border: {
      type: Boolean,
      default: () => true
    },
    borderRadius: {
      type: Number,
      default: 8
    }
  },
  watch: {
    value: {
      handler: function (imgList) {
        this.imageList = imgList || [];
        this.imageLength = this.imageList.filter(
          (item) => !item.delFlag
        ).length;
      },
      deep: true,
      immediate: true
    }
  },
  data() {
    return {
      imageList: [],
      imageLength: 0
    };
  },
  computed: {
    _imageList() {
      return this.imageList.filter((item) => !item.delFlag);
    }
  },
  methods: {
    uploadImage() {
      console.log('点击提示');
      if (this.uploading) {
        uni.showLoading({
          title: '请稍后...',
          mask: true
        });
        return;
      }
      uni.chooseImage({
        count: this.count,
        success: (res) => {
          console.log('输出文件选择结果', res);
          uni.showLoading({
            title: '上传中...',
            mask: true
          });
          this.uploading = true;
          let count = res.tempFiles.length,
            _count = 0;
          let uploadList = [];
          // tempFiles
          res.tempFiles.forEach((file, fileIndex) => {
            console.log(file);
            let uploadPromise = this.upload(
              file,
              file.path,
              file.name || new Date().getTime() + '.png'
            );
            uploadList.push(uploadPromise);
          });
          Promise.all(uploadList)
            .then((res) => {
              this.imageList.push.apply(
                this.imageList,
                res.map((item) => {
                  item.category = this.category;
                  item.fileType = this.fileType;
                  item.delFlag = false;
                  return item;
                })
              );
              this.$emit('input', this.imageList);
              this.imageLength = this.imageList.filter(
                (item) => !item.delFlag
              ).length;
            })
            .finally(() => {
              uni.hideLoading();
              this.uploading = false;
            });
        },
        fail: (err) => {
          console.log('chooseImage api 调用失败', err);
        },
        complete: (complete) => {
          console.log('chooseImage api 调用完成', complete);
        }
      });
    },
    deleteImg(index) {
      uni.showModal({
        title: '提示',
        content: '确定删除此图片吗？',
        success: (res) => {
          if (res.confirm) {
            this.imageList[index].delFlag = true;
            // (this.imageList).splice(index, 1);
            this.$emit('input', this.imageList);
            this.imageLength = this.imageList.filter(
              (item) => !item.delFlag
            ).length;
          }
        }
      });
    },
    // 预览方法
    previewImg(index) {
      let imagesList = this.imageList
        .filter((image) => !image.delFlag)
        .map((image) => image.url);
      uni.previewImage({
        current: index,
        urls: imagesList
      });
    },
    /**
     * @param {Object} file 文件
     * @param {Object} filePath 文件临时地址
     * @param {String} fileName 文件名称
     */
    upload(file, filePath, fileName) {
      const data = {
        baseUrl: this.$utils.getConfig().fileUrl,
        url: 'file/uploadTemp',
        data: {
          category: this.category,
          fileType: this.fileType
        },
        file,
        filePath,
        fileName
      };
      return request(data);
    }
  }
};
</script>

<style scoped lang="scss">
.image-box,
.upload-box {
  width: 150rpx;
  height: 150rpx;
  border: 2rpx solid #d8d8d8;
  border-radius: 8rpx;
  margin: 20rpx 0 0 20rpx;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  overflow: hidden;

  .delete {
    width: 50rpx;
    height: 50rpx;
    position: absolute;
    top: 0;
    right: 0;
    background: rgba(0, 0, 0, 0.2);
    color: #ffffff;
    border-radius: 0 0 0 8rpx;
    line-height: 50rpx;
    text-align: center;
  }

  image {
    height: 100%;
    width: 100%;
  }
}

.upload-box-big {
  display: flex;
  flex-direction: column;
  align-items: center;

  .upload-box-title {
    margin-top: 14rpx;
    color: #8a8a8d;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
    width: 150rpx;
    text-align: center;
  }
}
.upload-box {
  .upload-bg {
    width: 100%;
    height: 100%;
  }
  .upload-icon {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
</style>

import {
  Dimensions,
  ImageBackground,
  ImageProps,
  StyleSheet,
  Text,
  Touchable,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {BORDERRADIUS, COLORS, FONTFAMILY, FONTSIZE, SPACING} from '../theme/theme';
import CustomIcon from './customIcon';
import BgIcon from './BgIcon';

const CardWidth = Dimensions.get('window').width * 0.32;

interface CoffeeCardProps {
  id: string;
  index: number;
  type: string;
  roasted: string;
  imagelink_square: ImageProps;
  name: string;
  price: any;
  special_ingredient: string;
  average_rating: number;
  buttonPressHandler: any;
}

const CoffeeCard: React.FC<CoffeeCardProps> = ({
  id,
  index,
  type,
  roasted,
  imagelink_square,
  name,
  price,
  special_ingredient,
  average_rating,
  buttonPressHandler,
}) => {
  return (
    <LinearGradient
      start={{x: 0, y: 0}}
      end={{x: 1, y: 1}}
      style={styles.CardLinearGradient}
      colors={[COLORS.primaryGreyHex, COLORS.primaryBlackHex]}>
      <ImageBackground
        source={imagelink_square}
        resizeMode="cover"
        style={styles.CardImage}>
        <View style={styles.CardRatingContainer}>
          <CustomIcon
            name={'star'}
            size={FONTSIZE.size_16}
            color={COLORS.primaryOrangeHex}
          />
          <Text style={styles.RatingText}>{average_rating}</Text>
        </View>
      </ImageBackground>
      <Text style={styles.CardTitle}>{name}</Text>
      <Text style={styles.CardSubTitle}>{special_ingredient}</Text>
      <View style={styles.CardFooterRow}>
        <Text style={styles.CardPrice}>
          $<Text style={styles.CardPriceCurrency}>{price.price}</Text>
        </Text>
        <TouchableOpacity onPress={() =>{
          buttonPressHandler({
            id,
            index,
            type,
            roasted,
            imagelink_square,
            name,
            special_ingredient,
            prices: [{...price, quantity: 1}],
          });
        }}>
          <BgIcon color={COLORS.primaryWhiteHex}
          name={'add'}
          size={FONTSIZE.size_10}
          BgColor={COLORS.primaryOrangeHex} />
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  CardLinearGradient: {
    borderRadius: BORDERRADIUS.radius_25,
    padding: SPACING.space_8,
  },
  CardImage: {
    width: CardWidth,
    height: CardWidth,
    borderRadius: BORDERRADIUS.radius_20,
    marginBottom: SPACING.space_10,
    overflow: 'hidden',
  },
  CardRatingContainer: {
    flexDirection: 'row',
    backgroundColor: COLORS.primaryBlackRGBA,
    alignItems: 'center',
    justifyContent: 'center',
    gap: SPACING.space_10,
    paddingHorizontal: SPACING.space_15,
    position: 'absolute',
    borderBottomLeftRadius: BORDERRADIUS.radius_20,
    borderTopRightRadius: BORDERRADIUS.radius_20,
    top: 0,
    right: 0,
  },
  RatingText: {
    lineHeight: 22,
    fontFamily:FONTFAMILY.poppins_medium,
    color: COLORS.primaryWhiteHex,
    fontSize: FONTSIZE.size_14,
  },
  CardTitle:{
    fontFamily:FONTFAMILY.poppins_medium,
    color: COLORS.primaryWhiteHex,
    fontSize: FONTSIZE.size_16,
  },
  CardSubTitle:{
    fontFamily:FONTFAMILY.poppins_light,
    color: COLORS.primaryWhiteHex,
    fontSize: FONTSIZE.size_10,
  },
  CardPrice:{
    fontFamily:FONTFAMILY.poppins_semibold,
    color: COLORS.primaryOrangeHex,
    fontSize: FONTSIZE.size_18,
  },
  CardPriceCurrency:{
    color: COLORS.primaryWhiteHex,
  },
  CardFooterRow:{
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems:'center',
    marginTop:SPACING.space_15
  }
});
export default CoffeeCard;

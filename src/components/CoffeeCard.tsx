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
import {BORDERRADIUS, COLORS, FONTSIZE, SPACING} from '../theme/theme';
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
            size={FONTSIZE.size_18}
            color={COLORS.primaryOrangeHex}
          />
          <Text>{average_rating}</Text>
        </View>
      </ImageBackground>
      <Text>{name}</Text>
      <Text>{special_ingredient}</Text>
      <View>
        <Text>
          $<Text>{price.price}</Text>
        </Text>
        <TouchableOpacity>
          <BgIcon />
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  CardLinearGradient: {},
  CardImage: {
    width: CardWidth,
    height: CardWidth,
    borderRadius: BORDERRADIUS.radius_20,
    marginBottom: SPACING.space_15,
    overflow: 'hidden',
  },
  CardRatingContainer: {},
});
export default CoffeeCard;

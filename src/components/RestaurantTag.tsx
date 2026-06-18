import { Box } from '@/components/ui/box';
import { Text } from '@/components/ui/text';

export const RestaurantTag = ({ text }) => {
  return (
    <Box
      className="bg-background-100"
      style={{
        borderRadius: 8,
        paddingVertical: 2,
        paddingHorizontal: 8,
        display: 'flex',
      }}>
      <Text style={{ fontSize: 14 }}>{text}</Text>
    </Box>
  );
};

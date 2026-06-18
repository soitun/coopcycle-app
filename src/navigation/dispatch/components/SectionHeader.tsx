import { useTranslation } from 'react-i18next';
import { Box } from '@/components/ui/box';
import { Text } from '@/components/ui/text';
import { TouchableOpacity, View } from 'react-native';
import { darkGreyColor, whiteColor } from '../../../styles/common';
import FAIcon from '@/src/components/Icon';

interface SectionHeaderProps {
  section: {
    id: string;
    title: string;
    backgroundColor: string;
    textColor: string;
    isUnassignedTaskList: boolean;
    ordersCount: number;
    tasksCount: number;
  };
  isExpanded: boolean;
  onToggle: () => void;
}

export function SectionHeader({ section, isExpanded, onToggle }: SectionHeaderProps) {
  const { t } = useTranslation();

  return (
    <Box className="bg-background-100">
      <TouchableOpacity
        onPress={onToggle}
        activeOpacity={0.5}
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingHorizontal: 8,
          paddingVertical: 4,
          backgroundColor: whiteColor,
          margin: 4,
          borderRadius: 5,
        }}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <View
            style={{
              backgroundColor: section.backgroundColor,
              borderRadius: 4,
              marginEnd: 8,
              padding: 4,
            }}>
            <Text
              style={{
                color: section.textColor,
              }}>
              {section.title}
            </Text>
          </View>
          <Text style={{ color: darkGreyColor }}>
            {section.isUnassignedTaskList
              ? `${section.ordersCount}   (${section.tasksCount} ${t(
                  'TASKS',
                ).toLowerCase()})`
              : section.tasksCount}
          </Text>
        </View>
        {section.tasksCount === 0 ? null : (
          <FAIcon
            name={isExpanded ? 'chevron-up' : 'chevron-down'}
            testID={`${section.id}:toggler`}
            color={darkGreyColor}
          />
        )}
      </TouchableOpacity>
    </Box>
  );
}
